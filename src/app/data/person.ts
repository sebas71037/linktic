import { IPerson } from "../interfaces/person.interface";

export const getPersonList = (): IPerson[] => {
    return [
        {
            "id": 1727505294423,
            "fullName": "Sebastian Vargas",
            "email" : "s7103@gmail.com",
            "cover" : "https://i.imgur.com/LDOO4Qs.jpg"
        },
        {
            "id": 1727505294423,
            "fullName": "Catalina Valencia",
            "email" : "c7103@gmail.com",
            "cover" : "https://i.imgur.com/DTfowdu.jpg"
        },
        {
            "id": 1727505294423,
            "fullName": "Daniela lineros",
            "email" : "d7103@gmail.com",
            "cover" : "https://i.imgur.com/yhW6Yw1.jpg"
        }
    ];    
}
