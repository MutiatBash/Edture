import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PrimaryButton, SecondaryButton } from "../Button";
import certificate from "/edture-cert.svg";
import { useNavigate } from "react-router-dom";

const Certificate = ({ firstName, lastName, course, onClose }) => {
	const certificateRef = useRef(null);

	const downloadCertificate = async () => {
		setTimeout(async () => {
			const canvas = await html2canvas(certificateRef.current, {
				scale: 2,
				useCORS: true,
			});
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [canvas.width, canvas.height],
			});
			pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
			pdf.save(`${firstName}-${lastName}-certificate.pdf`);
		}, 100); 
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-primaryBlack bg-opacity-50 z-50 backdrop-blur">
			<div className="bg-white flex flex-col p-7 rounded-lg gap-6">
				<button
					className="ml-auto bg-transparent border-0 float-right font-semibold outline-none focus:outline-none"
					onClick={onClose}
				>
					<span className="text-xl block outline-none focus:outline-none">
						&times;
					</span>
				</button>
				<div
					className="overflow-hidden transform transition-all"
					ref={certificateRef}
					style={{ position: "relative", width: "600px", height: "400px" }}
				>
					<img
						src={certificate}
						alt="Certificate Background"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							zIndex: -1,
						}}
					/>
					<div
						style={{
							position: "absolute",
							top: "63%",
							left: "35%",
							transform: "translate(-50%, -50%)",
							color: "#000",
						}}
						className="flex flex-col gap-8"
					>
						<div className="flex flex-col">
							<h2
								style={{
									fontSize: "32px",
									marginBottom: "34px",
									lineHeight: "0",
								}}
								className="font-medium"
							>
								{firstName}
							</h2>
							<h2
								style={{
									fontSize: "32px",
									lineHeight: "0",
									marginBottom: "22px",
								}}
								className="font-medium"
							>
								{lastName}
							</h2>
						</div>
						<div className="flex flex-col gap-6">
							<p
								style={{
									fontSize: "6px",
									marginLeft: "28px",
									// marginTop: "19px",
									lineHeight: "0",
								}}
							>
								{course}
							</p>
							<p
								style={{
									fontSize: "6px",
									marginLeft: "50px",
									// marginTop: "8px",
									lineHeight: "0",
								}}
							>
								on {new Date().toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<PrimaryButton
						onClick={downloadCertificate}
						text={"Download PDF"}
					/>
					{/* <SecondaryButton
						onClick={backToCourses}
						text={"Back to courses"}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default Certificate;
