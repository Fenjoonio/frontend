import dayjs from "dayjs";
import jalaliday from "jalaliday";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
dayjs.locale("fa");

export default dayjs;
