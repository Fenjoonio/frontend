import dayjs from "dayjs";
import jalaliday from "jalali-plugin-dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
dayjs.locale("fa");

export default dayjs;
