import React from "react";

const Output = ({output}) => {
    const isError = output?.isError;
    let result = output?.result;
    result = result?.replace(/\n/g, "<br>");
    //console.log(result)
    return (
        <>
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <div
        className={`w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto ${
          isError ? "text-red-500" : "text-white"
        }`}
        dangerouslySetInnerHTML={{ __html: result }}
      />
        </>
      );
}
export default Output