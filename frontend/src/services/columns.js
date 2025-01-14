import fetcher from "./fetcher.js";

export function        createColumn({data}) {
        return (fetcher.postJson({
                url: "/api/lists",
                data
        }));
}

export function        updateColumn({data, id}) {
        return (fetcher.patchJson({
                url: `/api/lists/${id}`,
                data
        }));
}

export function        replaceColumn({data, id}) {
        return (fetcher.putJson({
                url: `/api/lists/${id}`,
                data
        }));
}

export function        deleteColumn({id}) {
        return (fetcher.deleteJson({
                url: `/api/lists/${id}`,
        }));
}