import React from "react";

export default function About() {
  return (
    <>
      <section className="w-1/2 bg-right  aboutCont">
        <div className="w-3/5 aboutWrapp">
          <p className="text-amber-500 mt-16 mb-4 textcenter">About</p>
          <h2 className="text-2xl font-semibold mb-2 textcenter">
            Evangadi Networks Q&A
          </h2>
          <p className="text-sm mb-2 text-slate-500">
            Lorem ipsum dolor sit amet cons dipisicing elit. Dolor quaerat totam
            nam! Corrupti commodi officia aliquam unde. Quos,
          </p>
          <p className="text-sm mb-2 text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            quaerat totam nam! Corrupti commodi officia aliquam unde. Quos,
            ipsum dignissimos
          </p>
          <p className="text-sm mb-2 text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            quaerat totam nam! Corrupti commodi officia aliquam unde. Quos,
            ipsum dignissimos
          </p>
          <div className="textcenter">
            <button className="mt-7 px-8 py-1 bg-orange-500 text-white rounded-sm mb-20 text-sm">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
