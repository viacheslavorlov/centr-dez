import { useStore } from '@nanostores/preact';
import { getCollection, type CollectionEntry } from 'astro:content';
import clsx from 'clsx';
import type { ChangeEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import { numAnswer } from 'src/store';

type Question = {
	title: string;
	ansvers: { answer: string; result: string }[];
};

type Props = {
	titel_1: string;
	titel_2: string;
	discount: string;
	questions: Question[];
	pizeTitle: string;
	pizeImg: string;
	className?: string;
};

type Parasites = 'грызуны' | 'тараканы' | 'клопы' | 'нет' | '';

const wordEnding = (num: number) => {
	switch (num) {
		case 1:
			return '';
		case 2:
			return 'а';
		case 3:
			return 'а';
		case 4:
			return 'а';
		case 5:
			return 'ов';
		default:
			return 'ов';
	}
};

const getData = async () => {
	const questionsData = await getCollection('questions');
	const questions: CollectionEntry<'questions'>['data'] = questionsData.map(item => item.data);

	const quizData = await getCollection('quiz');
	const quiz: CollectionEntry<'quiz'>['data'] = quizData[0].data;

	return { ...quiz, questions };
};

export function QuizCard({ className }: { className?: string }) {
	const [data, setData] = useState<Props | null>(null);
	const [result, setResult] = useState<{ грызуны: number; тараканы: number; клопы: number }>({
		грызуны: 0,
		тараканы: 0,
		клопы: 0,
	});
	const [current, setCurrent] = useState<Parasites>('');
	const num = useStore(numAnswer);

	const increase = () => {
		if (data?.questions?.length && current && num < data?.questions?.length && current) {
			numAnswer.set(num + 1);
			current.split(' ').forEach(item => {
				setResult((prev) => ({ ...prev, [item]: prev[item] + 1 }));
			});
			setCurrent(prev => '');
		}
	};

	const decrease = () => {
		if (data?.questions?.length && num < data?.questions?.length && current) {
			numAnswer.set(num - 1);
			if (current) {
				current.split(' ').forEach(item => {
					setResult(prev => ({ ...prev, [item]: prev[item] - 1 }));
				});
				setCurrent(prev => '');
			}
		}
	};

	const giveAnsver = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrent(e?.target?.value!);
	};

	const dots = data?.questions?.map((item, i) => (
		<div
			class={clsx(
				'w-6 md:w-8 aspect-square rounded-full border border-secondary-bg relative z-30',
				i <= num ? 'bg-secondary-bg' : 'bg-primary-bg'
			)}></div>
	));

	useEffect(() => {
		getData().then(res => setData(res));
	}, []);

	if (!data) return null;
	return (
		<div class={clsx('grid grid-cols-1 md:grid-cols-9 gap-8', className)}>
			<div class={'flex flex-col md:col-span-6 lg:col-span-7 gap-6 md:gap-10'}>
				<h2 class={'text-3xl md:text-5xl'}>
					{data?.titel_1} {data?.questions?.length - num} вопрос
					{wordEnding(data?.questions?.length - num)} {data?.titel_2}{' '}
					<span class={'text-3xl md:text-5xl text-secondary-bg text-nowrap'}>
						{data?.discount}
					</span>
				</h2>

				<div class={'flex w-full relative justify-between'}>
					{dots} <hr class={'absolute w-full bottom-1/2 border-2 border-secondary-bg'} />
				</div>
				<div class={'text-3xl'}>{data?.questions?.[num]?.title}</div>
				<div class={'flex flex-col gap-4'}>
					{data?.questions?.[num]?.ansvers?.map((item, i) => (
						<div class={'flex gap-2 items-center'}>
							<input
								onChange={giveAnsver}
								id={item.answer + i}
								value={item?.result}
								type={'radio'}
								checked={current === item.result}
								name={'answer' + num}
								className={
									'w-4 h-4  rounded-full text-accent bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								}
							/>
							<label class={'text-xl'} htmlFor={item.answer + i}>{item?.answer}</label>
						</div>
					))}
				</div>

				<div class={'flex flex-col md:flex-row w-full gap-4 md:gap-8'}>
					<button
						class={clsx(
							'button relative bg-accent text-center px-4 w-full py-2 rounded-full text-white font-semibold hover:bg-accent-secondary',
							className
						)}
						onClick={decrease}>
						Назад
					</button>
					{num + 1 === data.questions.length ? (
						<a
							title={current === '' ? 'Ответьте на последний вопрос' : ''}
							disabled={current === ''}
							style={
								current === '' ? { pointerEvents: 'none', background: 'gray' } : {}
							}
							class={
								'button relative  drop-shadow-lg bg-accent text-center px-4 w-full py-2 rounded-full text-white font-semibold hover:bg-accent-secondary'
							}
							href='/form'>
							<button class={clsx('', className)}>Получить подарок</button>
						</a>
					) : (
						<button
							disabled={!current}
							class={clsx(
								'button relative  drop-shadow-lg bg-accent text-center px-4 w-full py-2 rounded-full text-white font-semibold hover:bg-accent-secondary',
								className
							)}
							onClick={increase}>
							Вперед
						</button>
					)}
				</div>
			</div>

			<div class='flex w-full md:col-span-3 lg:col-span-2  border border-secondary-bg md:flex-col p-4 md:p-8 lg:p-12 rounded-2xl bg-gradient-to-b from-secondary-bg/40 to-transparent'>
				<div>
					<p class={'text-center text-lg mb-6'}>{data?.pizeTitle}</p>
					<p class={'text-2xl text-center'}>
						{data.questions.length! - num} вопрос
						{wordEnding(data.questions.length! - num)}
					</p>
				</div>
				<div class={'mt-auto mx-auto w-full'}>
					<img
						src={data?.pizeImg}
						class={'mx-auto'}
						alt={''}
						width={'220'}
						height={'220'}
					/>
				</div>
			</div>
		</div>
	);
}
