import bannerImg from "../../assets/banner.png";
export const Banner = () => {
  return (
    <div className=" flex flex-col md:flex-row py-16 justify-between items-center gap-12">
      <div className=" md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="" />
      </div>

      <div className=" md:w-1/2 w-full">
        <h1 className=" md:text-5xl text-2xl font-medium mb-7">
          الإصدارات الجديدة هذا الأسبوع
        </h1>
        <p className=" mb-10">
          حان الوقت لتحديث قائمة القراءة الخاصة بك ببعض أحدث وأروع الإصدارات في
          عالم الأدب. من الروايات المثيرة إلى المذكرات الملهمة، تقدم الإصدارات
          الجديدة هذا الأسبوع شيئًا يناسب الجميع
        </p>
        <button className="btn-primary">تعرف على المزيد</button>
      </div>
    </div>
  );
};
