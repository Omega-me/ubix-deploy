/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { eStatusCode } from "common/enums";

/**
 *
 * @param response AxiosResponse
 * @returns boolean
 */
export const checkSuccess = <TData = any>(response: AxiosResponse<TData, any> | undefined): boolean => {
    if (
        response?.status === eStatusCode.OK ||
        response?.status === eStatusCode.CREATED ||
        response?.status === eStatusCode.ACCEPTED ||
        response?.status === eStatusCode.NO_CONTENT
    ) {
        return true;
    } else {
        return false;
    }
};

// is active parent check
export const isActiveParent = (data: any = [], path: string) => {
    if (data?.length !== 0) {
        return data?.some(({ items }: any) =>
            items?.some(
                (menu: any) =>
                    menu.routePath.replace(/\/\d+/, "") ===
                    path.replace(/\/\d+/, "")
            )
        );
    }
};

// is active parent childe check
export const isActiveParentChaild = (data: any = [], path: string) => {
    if (data?.length !== 0) {
        return data?.some(
            (menu: any) =>
                menu.routePath.replace(/\/\d+/, "") ===
                path.replace(/\/\d+/, "")
        );
    }
};

// is active link check
export const isActiveLink = (menuPath: string | undefined, routePath: string | undefined) => {
    if (menuPath && routePath) {
        return menuPath === routePath;
    }
};