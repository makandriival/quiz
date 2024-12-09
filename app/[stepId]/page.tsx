import { StepMapper } from "../components/steps/stepMapper";

export default async function Step({
	params,
}: {
	params: Promise<{ stepId: string }>;
}) {
	const stepId = Number((await params).stepId);

	return (
		<div className="flex flex-col items-center justify-center min-w-full md:min-w-[600px] lg:min-w-[800px] xl:min-w-[1000px]">
			<h1 className="text-4xl font-bold leading-tight text-orange-400">Quiz</h1>
			<StepMapper stepId={stepId} />
		</div>
	);
}
