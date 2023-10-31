import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import { v4 as uuid } from "uuid";
import moment from "moment";
import path from "path";

interface iData {
	id: string;
	time: string;
	name: string;
	course: string;
}

let database: Array<iData> = [];

const mainApp = (app: Application) => {
	app.get("/", (req: Request, res: Response): Response => {
		try {
			return res.status(statusCode.Ok).json({
				message: "Welcome To My Api",
			});
		} catch (error) {
			return res.status(statusCode.BAD_REQUEST).json({
				message: "Error",
			});
		}
	});

	app.get("/api/v1/read-data", (req: Request, res: Response) => {
		try {
			return res.status(statusCode.Ok).json({
				message: "Reading from dataBase",
				data: database,
			});
		} catch (error) {
			return res.send(statusCode.BAD_REQUEST).json({
				message: "Error reading from dataBase",
			});
		}
	});

	app.get(
		"/api/v1/get-one-data/:userID",
		(req: Request, res: Response) => {
			try {
				const { userID } = req.params;

				const user = database.find((el: iData) => {
					return el.id === userID;
				});

				return res.status(statusCode.Ok).json({
					message: "Reading one from dataBase",
					data: user,
				});
			} catch (error) {
				return res.send(statusCode.BAD_REQUEST).json({
					message: "Error reading from dataBase",
				});
			}
		}
	);

	app.post("/api/v1/create-data", (req: Request, res: Response) => {
		try {
			const { name, course } = req.body;

			const data = {
				id: uuid(),
				name,
				course,
				time: moment(new Date().getTime()).format("LTS"),
			};

			database.push(data);
            const dataPath = path.join(__dirname, "data", "./database.json")

            

			return res.status(statusCode.Ok).json({
				message: "Creating From dataBase",
				data,
			});
		} catch (error) {
			return res.status(statusCode.BAD_REQUEST).json({
				message: "Error creating bataBase",
			});
		}
	});

	app.patch(
		"/api/v1/update-data/:userID",
		(req: Request, res: Response) => {
			try {
				const { course } = req.body;

				const { userID } = req.params;

				const user: iData | any = database.find((el: iData) => {
					return el.id === userID;
				});

				user.course = course;

				return res.status(statusCode.Ok).json({
					message: "Reading from dataBase",
					data: user,
				});
			} catch (error) {
				return res.send(statusCode.BAD_REQUEST).json({
					message: "Error reading from dataBase",
				});
			}
		}
	);
	app.delete(
		"/api/v1/delete-data/:userID",
		(req: Request, res: Response) => {
			try {
				const { userID } = req.params;

				const user: iData | any = database.find((el: iData) => {
					return el.id === userID;
				});

				const newdataBase = database.filter((el: iData) => {
					return el.id !== userID;
				});

				database = newdataBase;

				return res.status(statusCode.Ok).json({
					message: `${user.name} Has Been Successfully Deleted`,
					data: user,
				});
			} catch (error) {
				return res.send(statusCode.BAD_REQUEST).json({
					message: "Error reading from dataBase",
				});
			}
		}
	);
};

export default mainApp;