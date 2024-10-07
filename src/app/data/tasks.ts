import { ITask } from "../interfaces/task.interface";

export const getTasksList = (): ITask[] => {
    return [
        {
            "id": 1,
            "taskName": "Hacer el desayuno",
            "status" : true,
            "description": "Debemos comprar los ingredientes:\n\n- huevos\n- aceite\n- café",
            "dueDate": new Date("2024-08-30T05:00:00.000Z"),
            "assigneTo": {
                "id": 1727505294423,
                "fullName": "Sebastian Vargas",
                "email" : "s7103@gmail.com",
                "cover" : "https://i.imgur.com/LDOO4Qs.jpg"
            },
            "update_date": new Date(Date.now())
        },
        {
            "id": 2,
            "taskName": "Ir de paseo",
            "status" : false,
            "dueDate": new Date("2024-08-30T05:00:00.000Z"),
            "assigneTo": {
                "id": 1727505294423,
                "fullName": "Catalina Valencia",
                "email" : "c7103@gmail.com",
                "cover" : "https://i.imgur.com/DTfowdu.jpg"
            },
            "update_date": new Date(Date.now())
        }
    ];    
}
