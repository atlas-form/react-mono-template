import { useMemo, useState } from "react";
import {
	deleteWithSignedUrlApi,
	getAccessSignApi,
	getDeleteSignApi,
	getUploadDocumentSignApi,
	getUploadImageSignApi,
	uploadWithSignedUrlApi,
} from "@/api";

type UploadKind = "image" | "document";

interface UploadState {
	key: string;
	uploadUrl: string;
	accessUrl?: string;
	deleted?: boolean;
}

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const DOC_EXTS = new Set(["pdf", "doc", "docx", "xls", "xlsx", "txt", "md"]);

function getFileExt(file: File): string {
	const fileName = file.name || "";
	const idx = fileName.lastIndexOf(".");
	if (idx < 0 || idx === fileName.length - 1) return "";
	return fileName.slice(idx + 1).toLowerCase();
}

export default function S3UploadPanel() {
	const [activeTab, setActiveTab] = useState<UploadKind>("image");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [records, setRecords] = useState<Partial<Record<UploadKind, UploadState>>>({});

	const current = records[activeTab];

	const title = useMemo(() => {
		if (activeTab === "image") return "Image";
		return "Document";
	}, [activeTab]);

	const handleUpload = async (file: File) => {
		setLoading(true);
		setMessage("");
		try {
			let key = "";
			let uploadUrl = "";

			if (activeTab === "image") {
				const ext = getFileExt(file);
				if (!IMAGE_EXTS.has(ext)) {
					throw new Error(`image ext not supported: ${ext || "<empty>"}`);
				}
				const sign = await getUploadImageSignApi({ ext });
				await uploadWithSignedUrlApi(file, sign);
				key = sign.key;
				uploadUrl = sign.upload_url;
			}

			if (activeTab === "document") {
				const ext = getFileExt(file);
				if (!DOC_EXTS.has(ext)) {
					throw new Error(`document ext not supported: ${ext || "<empty>"}`);
				}
				const sign = await getUploadDocumentSignApi({ ext });
				await uploadWithSignedUrlApi(file, sign);
				key = sign.key;
				uploadUrl = sign.upload_url;
			}

			setRecords((prev) => ({
				...prev,
				[activeTab]: {
					key,
					uploadUrl,
					deleted: false,
				},
			}));
			setMessage(`${title} upload success`);
		} catch (err) {
			const text = err instanceof Error ? err.message : String(err);
			setMessage(`${title} upload failed: ${text}`);
		} finally {
			setLoading(false);
		}
	};

	const handleAccessSign = async () => {
		if (!current?.uploadUrl) return;
		setLoading(true);
		setMessage("");
		try {
			const res = await getAccessSignApi({ key: current.key });
			setRecords((prev) => ({
				...prev,
				[activeTab]: {
					...prev[activeTab],
					accessUrl: res.download_url,
				} as UploadState,
			}));
			setMessage(`${title} access sign success`);
		} catch (err) {
			const text = err instanceof Error ? err.message : String(err);
			setMessage(`${title} access sign failed: ${text}`);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteSign = async () => {
		if (!current?.uploadUrl) return;
		setLoading(true);
		setMessage("");
		try {
			const sign = await getDeleteSignApi({ key: current.key });
			await deleteWithSignedUrlApi(sign);
			setRecords((prev) => ({
				...prev,
				[activeTab]: {
					...prev[activeTab],
					deleted: true,
				} as UploadState,
			}));
			setMessage(`${title} delete success`);
		} catch (err) {
			const text = err instanceof Error ? err.message : String(err);
			setMessage(`${title} delete failed: ${text}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="ui-panel">
			<div className="ui-tabs">
				{(["image", "document"] as UploadKind[]).map((tab) => (
					<button
						key={tab}
						type="button"
						disabled={loading}
						onClick={() => setActiveTab(tab)}
						className={`ui-tab-btn ${
							activeTab === tab
								? "ui-tab-btn-active"
								: "ui-tab-btn-inactive"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="ui-panel-stack">
				<div>
					<label className="ui-upload-label">
						Upload {title}
					</label>
					<input
						type="file"
						disabled={loading}
						accept={
							activeTab === "image" ? "image/*" : ".pdf,.doc,.docx,.xls,.xlsx,.txt,.md"
						}
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							void handleUpload(file);
							e.currentTarget.value = "";
						}}
						className="ui-upload-input"
					/>
				</div>

				<div className="ui-actions-inline">
					<button
						type="button"
						disabled={loading || !current?.uploadUrl}
						onClick={() => void handleAccessSign()}
						className="ui-btn-indigo"
					>
						Get Access Sign
					</button>
					<button
						type="button"
						disabled={loading || !current?.uploadUrl}
						onClick={() => void handleDeleteSign()}
						className="ui-btn-danger"
					>
						Delete By Sign
					</button>
				</div>

				{message ? (
					<p className="ui-panel-note">{message}</p>
				) : null}

				{current?.key ? (
					<div className="ui-code-card">
						<p className="ui-break-all">
							<span className="ui-text-strong">key:</span> {current.key}
						</p>
						<p className="ui-break-all">
							<span className="ui-text-strong">uploadUrl:</span> {current.uploadUrl}
						</p>
						{current.accessUrl ? (
							<p className="ui-break-all">
								<span className="ui-text-strong">accessUrl:</span> {current.accessUrl}
							</p>
						) : null}
						<p>
							<span className="ui-text-strong">deleted:</span>{" "}
							{current.deleted ? "yes" : "no"}
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
