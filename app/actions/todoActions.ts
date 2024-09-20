'use server';

import qs from 'qs';

export async function fetchWayiTodo(page: number, type: string) {
    const baseUrl = `https://wayi.league-funny.com/api/task`;

    try {
        const response = await fetch(`${baseUrl}?${qs.stringify({
            page: page,
            type: type
        })}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while retrieving Todo data: ', error);
    }
}
