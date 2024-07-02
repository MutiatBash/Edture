import React from "react";
import Chat from "../components/Chat";
import DashboardLayout from "../layouts/DashboardLayout";

const Inbox = () => {
	return (
		<DashboardLayout showFooter={false}>
			<Chat />
		</DashboardLayout>
	);
};

export default Inbox;
