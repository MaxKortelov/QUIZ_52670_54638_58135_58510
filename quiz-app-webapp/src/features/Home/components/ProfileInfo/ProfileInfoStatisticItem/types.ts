import { ReactNode } from "react";

export type ProfileData = {
    progress: number,
    statistic: StatisticItem[]
}

export type StatisticItem = {
    icon: ReactNode,
    title: string,
    description: string,
}
