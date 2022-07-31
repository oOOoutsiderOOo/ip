import { useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ip } = req.query;
    console.log(ip);
    //fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_H4xxDoaJodwAChJ6LjHvkA5wu2duz&ipAddress=${ip}`)
    fetch(`http://ipwho.is/${ip}`)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .then(response => {
            res.statusCode = 200;
            res.end(JSON.stringify(response));
        });
}
