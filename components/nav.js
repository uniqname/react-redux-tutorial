import Link from './link';

export default ({
  links=[{
    href:'',
    text:'',
    position:0
  }]
}={}) => (
    <div>
        { links.map(link => <Link href={link.href} text={link.text} key={link.position}/>) }
    </div>
);
