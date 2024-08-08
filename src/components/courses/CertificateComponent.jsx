import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PrimaryButton, SecondaryButton } from "../Button";
import certificate from "/certificate-img.svg";
import { Navigate, useNavigate } from "react-router-dom";

const Certificate = ({ firstName, lastName, course }) => {
	const certificateRef = useRef(null);
	const navigate = useNavigate();

	const backToCourses = () => {
		navigate("/courses");
	};

	const downloadCertificate = async () => {
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
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-primaryBlack bg-opacity-50 z-50 backdrop-blur">
			<div className="bg-white flex flex-col p-7 rounded-lg">
				<button
					className="ml-auto bg-transparent border-0 float-right font-semibold outline-none focus:outline-none"
					onClick={backToCourses}
				>
					<span className="text-xl block outline-none focus:outline-none">
						&times;
					</span>
				</button>
				<div
					className="overflow-hidden transform transition-all"
					ref={certificateRef}
					style={{ position: "relative", width: "500px", height: "400px" }}
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
							zIndex: -1,
						}}
					/>
					<div
						style={{
							position: "absolute",
							top: "55%",
							left: "40%",
							objectFit: "cover",
							transform: "translate(-50%, -50%)",
							color: "#000",
						}}
					>
						<div className="flex flex-col gap-8">
							<h2
								style={{
									fontSize: "30px",
									margin: 0,
									lineHeight: "0",
								}}
								className="font-medium "
							>
								{firstName}
							</h2>
							<h2
								style={{
									fontSize: "30px",
									lineHeight: "0",
									marginBottom: "10px",
								}}
							>
								{lastName}
							</h2>
						</div>

						<p
							style={{
								fontSize: "8px",
								marginLeft: "40px",
								marginTop: "22px",
							}}
						>
							{course}
						</p>
						<p
							style={{
								fontSize: "8px",
								marginLeft: "40px",
								marginTop: "8px",
							}}
						>
							on {new Date().toLocaleDateString()}
						</p>
					</div>
				</div>
				<div className="flex justify-between">
					<PrimaryButton onClick={downloadCertificate} text={"Download PDF"} />
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
