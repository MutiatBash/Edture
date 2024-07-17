import React from "react";
import Chat from "../components/inbox/Chat";
import {StudentDashboardLayout} from "../layouts/DashboardLayout";

const Inbox = () => {
	return (
		<StudentDashboardLayout showFooter={false}>
			<Chat />
		</StudentDashboardLayout>
	);
};

export default Inbox;
