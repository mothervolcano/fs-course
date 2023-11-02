
interface HeaderProps {
	name: string;
}

const Header = ( props: HeaderProps ) => {

	const { name } = props;

	return <h1>{name}</h1>
}

export default Header;