"use client";

import styles from "./styles/dashboard.module.scss";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import Tile from "@/components/tile";
import { usePayloadContext } from "@/context/payloadProvider";

export default function DashboardPage() {
  const router = useRouter(); // Initialize the router
  interface payloadValues {
    score: any;
  }
  const {
    scriptPayload,
    setScriptPayload,
    resultPayload,
    setResultPayload,
    score
  } = usePayloadContext();





  useEffect(() => {
    // Redirect to home if resultPayload is not defined
    if (!resultPayload) {
      router.push("/"); // Redirect to the home page
      return;
    }
    console.log(score)

  }, [resultPayload, router]);

  return (
    <div className={styles.pageHero}>
      <div className={styles.title}>
        <h1>Script Analysis</h1>
      </div>
      <div className={styles.parentDiv}>
        <div className={styles.childLeft}>
          <div className={styles.sectionLeftFirst}>
            <h2>Video Script</h2>
            <div className={styles.script}>{scriptPayload}</div>
          </div>
          <div className={styles.sectionLeftSecond}>
            <Tile header="Do's and Don'ts Compliance" tickColor="red">
              {resultPayload?.message?.ddc}
            </Tile>
          </div>
        </div>
        <div className={styles.childRight}>
          <div className={styles.sectionRightFirst}>
            <h2>Score Analysis</h2>
            <Card
              className="w-[600px] h-[150px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500"
              style={{ left: 10, top: 25 }}
            >
              <CardBody className="justify-center items-center pb-0">
                <CircularProgress
                  classNames={{
                    svg: "w-24 h-24 drop-shadow-md",
                    indicator: "stroke-white",
                    track: "stroke-white/10",
                    value: "text-xl font-semibold text-white",
                  }}
                  showValueLabel={true}
                  strokeWidth={4}
                  value={score}
                />
              </CardBody>
              <CardFooter className="justify-center items-center pt-0">
                <Chip
                  classNames={{
                    base: "border-1 border-white/30",
                    content: "text-white/90 text-small font-semibold",
                  }}
                  variant="bordered"
                >
                  2800 Data points
                </Chip>
              </CardFooter>
            </Card>
          </div>
          <div className={styles.sectionRightSecond}>
            <Tile header="Key Points Coverage" tickColor="orange">
              {resultPayload?.message?.kpc}
            </Tile>
          </div>
          <div className={styles.sectionRightThird}>
            <Tile header="Overall Brand Safety" tickColor="green">
              {resultPayload?.message?.obs}
            </Tile>
          </div>
        </div>
      </div>
    </div>
  );
}
