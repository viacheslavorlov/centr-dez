import { Menu, Phone, X } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { navItems } from '../config/menu';

type Props = {
	className?: string;
};

const MobileMenu = ({ className }: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	return isVisible ? (
		<div
			className={`absolute bottom-0 left-0 right-0 z-20 top-0 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-primary-bg md:hidden ${className}`}>
			{navItems.map(item => (
				<>
					<div
						key={item.url}
						className='border text-primary-text  transition-all border-accent text-2xl px-4 py-2 rounded-2xl hover:scale-105 hover:text-white hover:bg-accent'
						onClick={() => setIsVisible(false)}>
						<a href={item.url}>{item.title}</a>
					</div>
				</>
			))}
			<div
				className='border text-primary-text  transition-all border-accent text-2xl px-4 py-2 rounded-2xl hover:scale-105 hover:text-white hover:bg-accent'
				onClick={() => setIsVisible(false)}>
			<a href={'tel:+78162555009'} class="flex gap-4 items-center">
					<Phone />
					Позвонить
				</a>
			</div>
			<div
				onClick={() => setIsVisible(false)}
				class={
					'rounded-full flex justify-center items-center m-auto bg-accent absolute right-6 top-4 h-10 w-10  hover:bg-accent-secondary'
				}>
				<X />
			</div>
		</div>
	) : (
		<div
			onClick={() => setIsVisible(prev => !prev)}
			className='md:hidden absolute flex justify-center z-20 items-center right-6 top-4 h-10 w-10  bg-accent rounded-full  hover:bg-accent-secondary'>
			<Menu class={'stroke-primary-text'} />
		</div>
	);
};

export default MobileMenu;
