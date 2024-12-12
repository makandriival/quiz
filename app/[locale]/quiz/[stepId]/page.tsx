import { StepMapper } from "@/app/components/stepMapper/stepMapper";


export default async function Step({
	params,
}: {
	params: Promise<{ stepId: string, locale: string }>;
}) {
	const {stepId, locale} = await params;

	return (
		<div className="flex flex-col items-center justify-center min-w-full md:min-w-[600px] lg:min-w-[800px] xl:min-w-[1000px]">
			<StepMapper stepId={+stepId} lang={locale}/>
		</div>
	);
}
