import React from "react";
import Chat from "../components/inbox/Chat";
import DashboardLayout from "../layouts/DashboardLayout";

const Inbox = () => {
	return (
		<DashboardLayout showFooter={false}>
			<Chat />
		</DashboardLayout>
	);
};

export default Inbox;
