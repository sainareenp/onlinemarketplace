import ChatPage from "./chatPage";

export default async function Page({
	params,
}: {
	params: Promise<{ conversationId: string }>;
}) {
	const { conversationId } = await params;

	return (
		<main className="flex flex-col h-screen overflow-hidden">
			<ChatPage conversationId={conversationId} />
		</main>
	);
}
