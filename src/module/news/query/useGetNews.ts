import { config } from "config";
import { XMLParser } from "fast-xml-parser";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { NewsDto } from "../types";

const useGetNews = (): QueryResult<NewsDto[]> =>
    useQuery(["news"], async () => {
        const res: Response = await fetch(config.newsRSSUrl);
        const data = await res.text();
        const options = {
            ignoreDeclaration: true,
            ignoreAttributes: false,
            attributeNamePrefix: "__",
            removeNSPrefix: true,
        };
        const parser = new XMLParser(options);
        return parser.parse(data)["rss"]["channel"]["item"];
    });

export default useGetNews;
