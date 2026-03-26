import { http, HttpResponse } from "msw";

const AUTH_BASE = "http://localhost:3100/auth";

export const handlers = [
	http.post(`${AUTH_BASE}/auth/login`, async () => {
		return HttpResponse.json({
			code: 0,
			message: "ok",
			data: {
				accessToken: "test-access-token",
				refreshToken: "test-refresh-token",
			},
		});
	}),

	http.get(`${AUTH_BASE}/user/me`, async () => {
		return HttpResponse.json({
			code: 0,
			message: "ok",
			data: {
				display_user_id: "u_1001",
				email: "tester@example.com",
				display_name: "Tester",
				username: "tester",
				avatar: "",
			},
		});
	}),
];
