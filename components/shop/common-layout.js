import React from "react";
import HeaderSeven from "../headers/header-seven";
import Breadcrubs from "../common/widgets/breadcrubs";
import Helmet from "react-helmet";
import favicon from "../../public/favicon.ico";
import MasterFooter from "../footers/common/MasterFooter";

const CommonLayout = ({ children, title, parent, subTitle, parentUrl= "/" }) => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
      </Helmet>
      <div>
      <div style={{paddingBottom: '8rem'}}>
      <HeaderSeven topClass="top-header" logoName="logo.png" />
      </div>
      <Breadcrubs title={title} parent={parent} subTitle={subTitle} parentUrl={parentUrl} />
      </div>
      <>{children}</>
      <MasterFooter
        footerClass={`footer-light `}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
      />
    </>
  );
};

export default CommonLayout;
