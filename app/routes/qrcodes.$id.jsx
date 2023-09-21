import {json} from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server"
import { getQRCodeImage } from "~/models/QRCode.server";


export const loader = async({params})=>{
    invariant(params.id,"could not find QR Code destination");
    const id = Number(params.id);
    const qrCode = await db.qRCode.findFirst({where:{id}});
    return json({
        title:qrCode.title,
        image:await getQRCodeImage(id)
    });
};

export defualt function QRCode() {
    const {image,title} = useLoaderData();
    return(
        <>
            <h1>{title}</h1>
            <img src={image} alt= {'QR code for the pruduct'} />
        </>
    );    
}