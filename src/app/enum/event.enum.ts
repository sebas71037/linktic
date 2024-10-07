export enum SocketEvent {
    /* On */
    SEND_TASKS = 'send-tasks',
    SEND_NEW_TASK = 'send-new-task',
    SEND_PERSONS = 'send-persons',

    /* Emits */
    LOAD_TASKS = 'load-tasks',
    CREATE_TASK = 'create-task',
    UPDATE_TASK = 'update-task',
    DELETE_TASK = 'delete-task',
    LOAD_PERSONS = 'load-persons',
}