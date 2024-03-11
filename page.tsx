import { Button } from "./../ui/button";
import _ from "lodash";
import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./../ui/sheet";
import {
  WhatsappShareButton,
  FacebookShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoPlayer from "./videoPlayer";
import { useSelector } from "react-redux";
import { selectCurrentMapSite } from "../../lib/slices/mapSlice";
import { message } from "antd";

const Site = ({ selectedSite, siteRef }) => {
  const map = useSelector(selectCurrentMapSite);
  const handleCopy = () => {
    message.success("URL copied to clipboard");
  };

  const [viewMore, editViewMore] = useState(false);


  
  const date = new Date(selectedSite?.createdAt);
  const day = date.toLocaleDateString("en-US");
  const toggleViewMore = () => editViewMore(!viewMore);
  const URL = `${window.location.href.split("?")[0]}?${
    map === "ny" ? "manahatta" : "naarm"
  }&site=${selectedSite?._id}`;

  useEffect(() => {
    return () => {
      editViewMore(false);
    };
  }, [editViewMore, siteRef]);

  // Attempting to toggle viewMore when side drawer closes
  useEffect(() => {
    const parentNode = siteRef.current?.dataset;

    if (parentNode?.state === "closed") {
      editViewMore(false);
    } else {
      console.log("open");
    }
    return () => {
      editViewMore(false);
    };
  }, [siteRef?.current?.dataset, siteRef]);



  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button ref={siteRef} className="invisible"></Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        id="s_width"
        className="bg-white text-black bg-opacity-60 no-scrollbar p-0"
      >
        <SheetHeader>
          <SheetTitle className=" font-normal p-3">
            {viewMore ? (
              <>
                More about
                <b className="pl-2">{selectedSite.contributor}</b>
              </>
            ) : (
              selectedSite.title
            )}
          </SheetTitle>
          <SheetDescription>
            {/* <VideoPlayer url={selectedSite.link} playing={video} height={"250px"}/> : */}
            <VideoPlayer
              url={viewMore ? selectedSite?.link : selectedSite?.video}
              // playing={video}
              height={"250px"}
            />
            <div className="p-3">
              <p className="py-2 italic text-black font-light">
                We acknowledge this project takes place on the unceded lands of
                the Boon Wurrung of the Kulin nation. We acknowledge their
                communities, their elders both past and present as well as
                future generations. We commit to the process of working to
                dismantle the ongoing legacies of settler colonialism
              </p>
              <p className="pt-6 pb-4 text-black" onClick={toggleViewMore}>
                {viewMore ? (
                  <>
                    <span
                      className="cursor-pointer"
                      //   onClick={playContributor}
                    >
                      <b> Return to story </b> click here
                    </span>
                  </>
                ) : (
                  <>
                    To learn more about{" "}
                    <span
                      className="cursor-pointer"
                      //   onClick={playContributor}
                    >
                      {" "}
                      <b>{selectedSite.contributor}</b> click here
                    </span>
                  </>
                )}
              </p>
              <p className="pt-3 text-[#2d2d2d]">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    siteRef.current.click();
                  }}
                  //   onClick={onCloseVideo}
                >
                  {" "}
                  <b>To return to map, click here</b>
                  <p className="pt-3">Published: {day}</p>
                </span>
              </p>
              <div className="pt-12 ">
                <p className="font-medium pb-4 text-black">Share on:</p>
                <div className="flex space-x-3">
                  <WhatsappShareButton
                    title={_.startCase(selectedSite?.title)}
                    url={URL}
                  >
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    title={_.startCase(selectedSite?.title)}
                    url={URL}
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton
                    title={_.startCase(selectedSite?.title)}
                    subject={_.startCase(selectedSite?.title)}
                    url={URL}
                    body={`Title: ${_.startCase(
                      selectedSite?.title
                    )} ${"\n"} ${"\n"} Copy link: `}
                  >
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                  <CopyToClipboard text={URL} onCopy={() => handleCopy()}>
                    <span className="rounded-full bg-black w-8 h-8 flex items-center justify-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-white w-4 h-4"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </span>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Site;
