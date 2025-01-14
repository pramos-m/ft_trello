import fetcher from "./fetcher.js";

export function        createLabel({data}) {
        return (fetcher.postJson({
                url: "/api/labels",
                data
        }));
}

export function        updateLabel({data, id}) {
        return (fetcher.patchJson({
                url: `/api/labels/${id}`,
                data
        }));
}

export function        replaceLabel({data, id}) {
        return (fetcher.putJson({
                url: `/api/labels/${id}`,
                data
        }));
}

export function        deleteLabel({id}) {
        return (fetcher.deleteJson({
                url: `/api/labels/${id}`,
        }));
}