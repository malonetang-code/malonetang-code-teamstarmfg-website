module.exports = {
  scopes: [
    {
      code: "01 / MATERIAL",
      name: { zh: "材料成分确认", en: "Material composition verification" },
      summary: {
        zh: "根据材料路线和项目要求，选择光谱分析或手持式 X 射线荧光分析等适用方法。",
        en: "Spectrometry or handheld X-ray fluorescence analysis is selected where applicable to the material route and project requirements."
      },
      equipment: {
        zh: "SPECTROLAB 光谱仪、VCA 手持式 X 射线荧光光谱仪",
        en: "SPECTROLAB spectrometer and VCA handheld XRF spectrometer"
      }
    },
    {
      code: "02 / HARDNESS",
      name: { zh: "硬度与金相检验", en: "Hardness and metallographic inspection" },
      summary: {
        zh: "依据材料、热处理工艺和受控要求，安排维氏硬度、洛氏硬度或金相检验。",
        en: "Vickers hardness, Rockwell hardness or metallographic inspection is applied according to the material, heat-treatment route and controlled requirements."
      },
      equipment: {
        zh: "三丰 MVK-H100、ZHR-8150LK、NIKON 金相显微镜",
        en: "Mitutoyo MVK-H100, ZHR-8150LK and NIKON metallographic microscope"
      }
    },
    {
      code: "03 / DIMENSION",
      name: { zh: "尺寸与几何检测", en: "Dimensional and geometric inspection" },
      summary: {
        zh: "针对安装接口、孔位、轮廓及其他受控尺寸，选用三坐标、影像测量或投影测量。",
        en: "Coordinate, image or profile-projection measurement is selected for mounting interfaces, hole patterns, profiles and other controlled dimensions."
      },
      equipment: {
        zh: "三丰 BEYOND APEX 707、KEYENCE IM-7000、JT-300",
        en: "Mitutoyo BEYOND APEX 707, KEYENCE IM-7000 and JT-300"
      }
    },
    {
      code: "04 / SURFACE",
      name: { zh: "表面与膜厚检测", en: "Surface and coating inspection" },
      summary: {
        zh: "按图纸、工艺或验收要求，对适用项目进行表面粗糙度或膜厚检测。",
        en: "Surface roughness or coating thickness is checked where required by the drawing, process route or acceptance criteria."
      },
      equipment: {
        zh: "三丰 SJ-310 平面粗度仪、EX-3000 荧光 X 线膜厚计",
        en: "Mitutoyo SJ-310 surface roughness tester and EX-3000 XRF coating thickness gauge"
      }
    }
  ],
  equipment: [
    {
      model: "SPECTROLAB",
      image: "/images/quality/spectrolab-spectrometer.jpeg",
      alt: { zh: "SPECTROLAB 光谱仪实拍", en: "SPECTROLAB spectrometer" },
      function: { zh: "光谱仪 / 材料成分分析", en: "Spectrometer / material-composition analysis" }
    },
    {
      model: "VCA",
      image: "/images/quality/vca-handheld-xrf.jpeg",
      alt: { zh: "VCA 手持式 X 射线荧光光谱仪实拍", en: "VCA handheld XRF spectrometer" },
      function: { zh: "手持式 X 射线荧光光谱仪", en: "Handheld XRF spectrometer" }
    },
    {
      model: "Mitutoyo MVK-H100",
      image: "/images/quality/mitutoyo-mvk-h100.jpeg",
      alt: { zh: "三丰 MVK-H100 维氏硬度试验机实拍", en: "Mitutoyo MVK-H100 Vickers hardness tester" },
      function: { zh: "维氏硬度试验机", en: "Vickers hardness tester" }
    },
    {
      model: "ZHR-8150LK",
      image: "/images/quality/zhr-8150lk-rockwell.jpeg",
      alt: { zh: "ZHR-8150LK 洛氏硬度计实拍", en: "ZHR-8150LK Rockwell hardness tester" },
      function: { zh: "洛氏硬度计", en: "Rockwell hardness tester" }
    },
    {
      model: "NIKON",
      image: "/images/quality/nikon-metallographic-microscope.jpeg",
      alt: { zh: "NIKON 金相显微镜实拍", en: "NIKON metallographic microscope" },
      function: { zh: "正置金相显微镜", en: "Upright metallographic microscope" }
    },
    {
      model: "Mitutoyo BEYOND APEX 707",
      image: "/images/quality/cmm-beyond-apex707.jpeg",
      alt: { zh: "三丰 BEYOND APEX 707 三坐标测量机实拍", en: "Mitutoyo BEYOND APEX 707 coordinate measuring machine" },
      function: { zh: "三坐标测量机", en: "Coordinate measuring machine" }
    },
    {
      model: "KEYENCE IM-7000",
      image: "/images/quality/keyence-im7000.jpeg",
      alt: { zh: "KEYENCE IM-7000 影像尺寸测量仪实拍", en: "KEYENCE IM-7000 image dimension measurement system" },
      function: { zh: "影像尺寸测量仪", en: "Image dimension measurement system" }
    },
    {
      model: "JT-300",
      image: "/images/quality/jt300-profile-projector.jpeg",
      alt: { zh: "JT-300 电子投影机实拍", en: "JT-300 electronic profile projector" },
      function: { zh: "电子投影机", en: "Electronic profile projector" }
    },
    {
      model: "Mitutoyo SJ-310",
      image: "/images/quality/mitutoyo-sj310.jpeg",
      alt: { zh: "三丰 SJ-310 平面粗度仪实拍", en: "Mitutoyo SJ-310 surface roughness tester" },
      function: { zh: "平面粗度仪", en: "Surface roughness tester" }
    },
    {
      model: "EX-3000",
      image: "/images/quality/ex3000-coating-thickness.jpeg",
      alt: { zh: "EX-3000 荧光 X 线膜厚计实拍", en: "EX-3000 XRF coating thickness gauge" },
      function: { zh: "荧光 X 线膜厚计", en: "XRF coating thickness gauge" }
    }
  ]
};
