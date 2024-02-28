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
	const [result, setResult] = useState<string[]>([]);
	const [current, setCurrent] = useState<string>('');
	console.log(data);
	console.log(data?.questions?.[1]?.ansvers);

	// const { discount, questions, titel_1, titel_2, className, pizeTitle, pizeImg } = props;
	const num = useStore(numAnswer);

	const increase = () => {
		if (data?.questions?.length && num <= data?.questions?.length && current) {
			numAnswer.set(num + 1);
			setResult(prev => [...prev, current]);
		}
	};

	const giveAnsver = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrent(e.target.value!);
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
		console.log('useeffect', data);
	}, []);
	if (!data) return null;
	return (
		<div class={clsx('grid grid-cols-1 md:grid-cols-9 gap-8', className)}>
			<div class={'flex flex-col md:col-span-6 gap-6 md:gap-10'}>
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
						<div class={'flex gap-2'}>
							<input
								onChange={giveAnsver}
								id={item.answer + i}
								value={item?.result}
								type={'radio'}
								name={'answer' + num}
							/>
							<label htmlFor={item.answer + i}>{item?.answer}</label>
						</div>
					))}
				</div>

				<div>
					<button onClick={increase}>Increas</button>
				</div>
			</div>

			<div class='flex w-full md:col-span-3 border border-secondary-bg md:flex-col p-4 md:p-8 lg:p-12 rounded-2xl bg-gradient-to-b from-secondary-bg/40 to-transparent'>
				<div>
					<p class={'text-center text-lg mb-6'}>{data?.pizeTitle}</p>
					<p class={'text-2xl text-center'}>
						{num + 1} вопрос{wordEnding(num + 1)}
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
