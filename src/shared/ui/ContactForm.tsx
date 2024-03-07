export function ContactForm() {
	return (
		<form
		class='gform flex flex-col w-full gap-8 md:gap-12 lg:gap-16 p-4 md:p-8 lg:p-12 shadow-lg rounded-2xl bg-secondary-bg/15 border-2 border-secondary-bg'
		action='https://script.google.com/macros/s/AKfycbwDm0ZSGYA_YOgmgt1IlIw9ck2g46sUpCdR9EHQqo55Di1x8hwkp3xoTWF40Tw1liDs/exec'
		method='POST'>
		<div class='flex flex-col'>
			<label>{"Номер телефона"}</label>
			<input
				class='p-4 md:p-5 rounded-2xl border border-accent-secondary'
				type='text'
				value=''
				name="Номер телефона"
				id='maskedInput'
				required
				placeholder="Номер телефона"
			/>
		</div>
		<button
			type='submit'
			class='text-white button bg-accent rounded-full px-8 py-4 hover:bg-accent-secondary'>
			{'Заказать звонок'}
		</button>
		<div
			style='display:none'
			class='thankyou_message'>
			<h2 class='flex flex-col'>
				<em class='text bold'>Спасибо что выбрали нас!</em> Наши сотрудники свяжутся с вами в
				ближайшее время.
			</h2>
		</div>
	</form>
	);
};
