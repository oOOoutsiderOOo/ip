import { FormEvent, MouseEvent, useEffect, useState, useMemo } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const initData = {
    ip: "8.8.4.4",
    success: true,
    type: "IPv4",
    continent: "North America",
    continent_code: "NA",
    country: "United States",
    country_code: "US",
    region: "California",
    region_code: "CA",
    city: "Mountain View",
    latitude: 37.3860517,
    longitude: -122.0838511,
    is_eu: false,
    postal: "94039",
    calling_code: "1",
    capital: "Washington D.C.",
    borders: "CA,MX",
    timezone: {
        id: "America/Los_Angeles",
        abbr: "PDT",
        is_dst: true,
        offset: -25200,
        utc: "-07:00",
        current_time: "2022-04-22T14:31:48-07:00",
    },
    connection: {
        asn: 15169,
        org: "Google LLC",
        isp: "Google LLC",
        domain: "google.com",
    },
};

const Home: NextPage = () => {
    const Map = dynamic(() => import("../components/maps"), { ssr: false });
    const [data, setData] = useState(initData);
    const [ip, setIp] = useState<string>("");

    const searchHandler = (e: any) => {
        const regex = new RegExp("^(?:(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(.(?!$)|$)){4}$");
        if (regex.test(ip) === false) {
            alert("That's not a valid IP");
            e.preventDefault();
            return false;
        }
        e.preventDefault();
        console.log("hola");
        fetch(`./api/${ip}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    };

    const map = useMemo(() => <Map lat={data.latitude} lng={data.longitude} />, [data]);
    return (
        <>
            <div className="background-map">
                <div className="background"></div>
                {map}
            </div>
            <div className="app-container">
                <header>
                    <h1>IP Address Tracker</h1>
                </header>
                <main>
                    <form onSubmit={e => searchHandler(e)}>
                        <input
                            type="text"
                            name="ip"
                            id="ip"
                            placeholder="Search for any IP address or domain"
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                        />
                        <input type="button" value="" onClick={e => searchHandler(e)} />
                    </form>
                    <section className="data-container">
                        <div className="data ip">
                            <h3>IP ADRESS</h3>
                            <h2>{data.ip}</h2>
                        </div>
                        <div className="data location">
                            <h3>LOCATION</h3>
                            <h2>{`${data.city}, ${data.postal}`}</h2>
                        </div>
                        <div className="data timezone">
                            <h3>TIMEZONE</h3>
                            <h2>{`UTC ${data.timezone.utc}`}</h2>
                        </div>
                        <div className="data isp">
                            <h3>ISP</h3>
                            <h2>{data.connection.isp}</h2>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Home;
