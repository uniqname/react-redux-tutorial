/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
app.set('port', (process.env.PORT || 4000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/comments', (req, res) =>
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    })
);

app.post('/api/comments', (req, res) =>
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        const newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments = comments.concat(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), err => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Cache-Control', 'no-cache');
            res.json(comments);
        });
    })
);


app.listen(app.get('port'), function() {
    console.log(`Server started: http://localhost: ${app.get('port')}/`);
});
