export interface AccessState {
    userRole: boolean,
    groupRole: boolean,
    error: Error,
    loading: boolean,
}

export interface Access {
    access: Access,
}