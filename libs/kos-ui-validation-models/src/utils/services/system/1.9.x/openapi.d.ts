export interface paths {
    "/api/system/test/forceRinse": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Force rinse of the line, This is for the hardware (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/system/test/test/cleaning": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Test the cleaning logic artificially (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/system/test/test/rinse": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Test the rinse logic artificially (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/system/test/dispense/{productId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** start product This is for the hardware (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description product to start */
                    productId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /** Stop product This is for the hardware (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description product to start */
                    productId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/system/test/getProducts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get product list This is for the hardware (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/system/pour/{bevId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Pour the specified beverage (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the beverage to pour. */
                    bevId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["33533b4a-9040-4a5a-b866-09f753b888e3"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "33533b4a-9040-4a5a-b866-09f753b888e3": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.tccc.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["7e3de31f-35a0-488c-b666-35657ce43218"];
            /** @description (typeName=com.tccc.kos.commons.util.concurrent.future.FutureWork) */
            rootFuture?: components["schemas"]["33533b4a-9040-4a5a-b866-09f753b888e3"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            name?: string;
            /** Format: int32 */
            progress?: number;
            /** @description (typeName=java.util.Map<java.lang.String, com.tccc.kos.commons.util.json.JsonViewWrapper>) */
            clientAttributes?: components["schemas"]["550c5b10-269c-4197-8003-1edfadbcfb17"];
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            abortAbandonedTimeoutMs?: number;
            /** @description (typeName=com.tccc.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["601943ec-0f46-4806-ace1-59f01e5cbfca"];
        };
        "7e3de31f-35a0-488c-b666-35657ce43218": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["e7681dba-c5e9-46c9-9774-3e096cedec49"];
            data?: Record<string, never>;
        };
        "e7681dba-c5e9-46c9-9774-3e096cedec49": unknown;
        /** @description (typeName=com.tccc.kos.commons.util.json.JsonViewWrapper) */
        "550c5b10-269c-4197-8003-1edfadbcfb17": components["schemas"]["601943ec-0f46-4806-ace1-59f01e5cbfca"];
        "601943ec-0f46-4806-ace1-59f01e5cbfca": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["e7681dba-c5e9-46c9-9774-3e096cedec49"];
            data?: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
