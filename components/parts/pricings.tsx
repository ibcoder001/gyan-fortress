"use client";
import Link from "next/link";
import { Fragment, useState } from "react";

type TSwitchOptions = "users" | "authors";

const FeatureAvailable = () => {
  return (
    <svg
      className="w-6 h-6 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      stroke="currentColor"
      fill="#10b981"
      viewBox="0 0 1792 1792"
    >
      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
    </svg>
  );
};

const FeatureNotAvailable = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      className="w-6 h-6 mr-2"
      fill="red"
      viewBox="0 0 1792 1792"
    >
      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
    </svg>
  );
};

const PricingCards = ({
  title,
  currency,
  price,
  description,
  features,
}: {
  title: string;
  currency: string;
  price: number;
  description: string;
  features: { mark: JSX.Element; name: string }[];
}) => {
  return (
    <div className="flex flex-col justify-start flex-1 w-full h-full px-8 py-12 rounded-md shadow-lg min-w-96 gradient-black">
      <p className="mb-4 text-xl font-medium text-gray-50">{title}</p>
      <p className="text-3xl font-bold text-white">
        {currency}
        {price}
        <span className="text-sm text-gray-300">/ month</span>
      </p>
      <p className="mt-4 text-xs text-gray-100">{description}</p>
      <ul className="w-full mt-6 mb-6 text-sm text-gray-100">
        {features.map((item) => (
          <li key={item.name} className="flex items-center mb-3">
            <>
              {item.mark}
              {item.name}
            </>
          </li>
        ))}
      </ul>
      <Link
        href={`${
          title === "Member" || title === "Pro Member"
            ? "/purchase"
            : "/auth/signup"
        }`}
        className={`btn-medium w-full ${
          title === "Member" || title === "Pro Member"
            ? "gradient-highlight"
            : "bg-white text-dark"
        }`}
      >
        {title === "Free" ? "Get started" : "Choose Plan"}
      </Link>
    </div>
  );
};

const userFeaturesFree = [
  {
    name: "All publically available books",
    mark: <FeatureAvailable />,
  },
  {
    name: "Can buy paid books",
    mark: <FeatureAvailable />,
  },
  {
    name: "Can buy free books",
    mark: <FeatureNotAvailable />,
  },
];

const userFeaturesMember = [
  {
    name: "All publically available books",
    mark: <FeatureAvailable />,
  },
  {
    name: "Can buy paid books",
    mark: <FeatureAvailable />,
  },
  {
    name: "Can buy free books",
    mark: <FeatureAvailable />,
  },
];

const authorFeaturesFree = [
  {
    name: "Upload your book PDFs and sell them",
    mark: <FeatureAvailable />,
  },
  {
    name: "Upto 100 sale per book",
    mark: <FeatureAvailable />,
  },
  {
    name: "Keep 70% of your profits on each sale",
    mark: <FeatureAvailable />,
  },
];

const authorFeaturesProMember = [
  {
    name: "Upload your book PDFs and sell them",
    mark: <FeatureAvailable />,
  },
  {
    name: "Upto 10000 sale per book",
    mark: <FeatureAvailable />,
  },
  {
    name: "Keep 85% of your profits on each sale",
    mark: <FeatureAvailable />,
  },
];

const authorFeaturesBusiness = [
  {
    name: "Upload your book PDFs and sell them",
    mark: <FeatureAvailable />,
  },
  {
    name: "Unlimited sales per book",
    mark: <FeatureAvailable />,
  },
  {
    name: "Keep 95% of your profits on each sale",
    mark: <FeatureAvailable />,
  },
];

const Pricings = () => {
  const [role, setRole] = useState<TSwitchOptions>("users");

  const handleRoleSwitch = (selectedRole: TSwitchOptions) => {
    setRole(selectedRole);
  };

  let content = <></>;

  if (role === "users") {
    content = (
      <div className="flex flex-col items-center justify-between w-auto gap-8 px-8 text-white md:flex-row">
        <PricingCards
          title="Free"
          currency="$"
          features={userFeaturesFree}
          price={0}
          description="Join for free"
        />
        <PricingCards
          title="Member"
          currency="$"
          features={userFeaturesMember}
          price={9.99}
          description="Become a member"
        />
      </div>
    );
  } else if (role === "authors") {
    content = (
      <div className="flex flex-col items-center justify-between gap-8 px-8 text-white md:flex-row">
        <PricingCards
          title="Free"
          currency="$"
          features={authorFeaturesFree}
          price={0}
          description="Sell for free. No payment required. Perfect for authors who want to test the waters"
        />
        <PricingCards
          title="Pro Member"
          currency="$"
          features={authorFeaturesProMember}
          price={29.99}
          description="Sell and earn more. Perfect for individual authors with rising popularity"
        />
        <PricingCards
          title="Business Member"
          currency="$"
          features={authorFeaturesBusiness}
          price={99.99}
          description="Go full throttle with unlimited selling with our business offering"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex px-8 py-6 text-white rounded-md gradient-black">
        <button
          className={`btn-small ${role === "users" ? "bg-gray-600" : ""}`}
          onClick={() => handleRoleSwitch("users")}
        >
          Users
        </button>
        <button
          className={`btn-small ${role === "authors" ? "bg-gray-600" : ""}`}
          onClick={() => handleRoleSwitch("authors")}
        >
          Authors
        </button>
      </div>
      {content}
    </Fragment>
  );
};

export default Pricings;
