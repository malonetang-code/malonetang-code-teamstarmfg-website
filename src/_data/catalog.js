module.exports = {
  products: [
    {
      slug: "woodworking-knives",
      code: "01 / WOODWORKING",
      image: "/images/product_01.png",
      name: { zh: "木工与家具制造刀具", en: "Woodworking and Furniture Knives" },
      summary: {
        zh: "平刨刀、指接刀、电动刨刀及设备配套刀片，可按图纸、旧刀样品和设备应用确认结构。",
        en: "Planer knives, finger-joint knives, electric planer knives and machine-matched blades reviewed from drawings, samples or equipment applications."
      },
      equipment: { zh: "平刨、压刨、指接与家具生产线", en: "Planers, moulders, finger-joint and furniture lines" },
      focus: { zh: "刃口、平面度、耐磨与换刀一致性", en: "Edge geometry, flatness, wear and repeat replacement" },
      rfq: {
        zh: ["刀具尺寸、厚度和孔位", "设备型号或旧刀照片", "被切木材与使用频率", "预计数量与寿命目标"],
        en: ["Blade dimensions, thickness and holes", "Machine model or old-blade photos", "Wood type and operating frequency", "Quantity and service-life target"]
      },
      applications: {
        zh: ["木材刨削与定厚", "指接与家具零部件加工", "设备厂配套与替换刀片"],
        en: ["Wood planing and thicknessing", "Finger-joint and furniture component processing", "Machine OEM supply and replacement blades"]
      }
    },
    {
      slug: "food-processing-knives",
      code: "02 / FOOD PROCESSING",
      image: "/images/product_04.png",
      name: { zh: "食品机械用刀", en: "Food Processing Machine Knives" },
      summary: {
        zh: "切肉、碎肉、绞肉、分切及食品设备配套刀片，按食品类型、清洁要求和设备接口进行评估。",
        en: "Slicing, mincing, grinding and food-machine blades reviewed against food type, cleanability and machine interface."
      },
      equipment: { zh: "切肉、绞肉、分切与包装前处理设备", en: "Slicing, mincing, cutting and pre-packaging equipment" },
      focus: { zh: "材料、清洁、耐腐蚀与刃口稳定", en: "Material, cleanability, corrosion resistance and edge stability" },
      rfq: {
        zh: ["食品类型与切割方式", "设备品牌和型号", "刀具尺寸或样品照片", "清洁方式、数量与目标寿命"],
        en: ["Food type and cutting method", "Machine brand and model", "Blade dimensions or sample photos", "Cleaning method, quantity and life target"]
      },
      applications: {
        zh: ["肉类切片与绞碎", "食品分切和定量切割", "食品设备 OEM 配套"],
        en: ["Meat slicing and mincing", "Food portioning and cutting", "Food-equipment OEM supply"]
      }
    },
    {
      slug: "plastic-crusher-blades",
      code: "03 / PLASTIC RECYCLING",
      image: "/images/product_05.png",
      name: { zh: "塑胶粉碎与造粒刀", en: "Plastic Crusher and Granulator Blades" },
      summary: {
        zh: "用于粉碎机、破碎机、造粒机及塑胶回收设备，按被切材料、设备负载和磨损目标确认制造路线。",
        en: "Blades for crushers, granulators and plastic-recycling equipment, reviewed by material cut, machine load and wear target."
      },
      equipment: { zh: "粉碎机、破碎机、造粒机与回收线", en: "Crushers, granulators and recycling lines" },
      focus: { zh: "冲击、耐磨、崩口风险与批量寿命", en: "Impact, wear, chipping risk and batch life" },
      rfq: {
        zh: ["塑料类型与是否含杂质", "设备型号、转速与装刀方式", "旧刀照片或图纸", "磨损现象、数量与寿命目标"],
        en: ["Plastic type and contamination", "Machine model, speed and mounting", "Old-blade photos or drawing", "Wear pattern, quantity and life target"]
      },
      applications: {
        zh: ["塑料粉碎与回收", "造粒前破碎", "设备替换刀和长期备件"],
        en: ["Plastic crushing and recycling", "Pre-granulation size reduction", "Replacement blades and long-term spares"]
      }
    },
    {
      slug: "paper-slitting-knives",
      code: "04 / PAPER CONVERTING",
      image: "/images/product_06.png",
      name: { zh: "纸品分切与修边刀", en: "Paper Slitting and Trimming Knives" },
      summary: {
        zh: "分条、修边、裁纸及文具类刀具，重点核对外径、内孔、厚度、端面和切口要求。",
        en: "Slitting, trimming, paper-cutting and stationery blades reviewed for OD, ID, thickness, face finish and cut quality."
      },
      equipment: { zh: "分条机、裁纸机与修边设备", en: "Slitters, paper cutters and trimming equipment" },
      focus: { zh: "切口、同心度、厚度与端面质量", en: "Cut quality, concentricity, thickness and face finish" },
      rfq: {
        zh: ["外径、内孔、厚度和孔位", "纸材、纸重与切割层数", "配刀方式与设备型号", "数量和切口要求"],
        en: ["OD, ID, thickness and holes", "Paper material, weight and layer count", "Knife pairing and machine model", "Quantity and cut-quality requirement"]
      },
      applications: {
        zh: ["纸张与纸板分切", "卷材修边", "裁纸和文具刀具"],
        en: ["Paper and board slitting", "Web trimming", "Paper cutting and stationery blades"]
      }
    },
    {
      slug: "textile-cutting-knives",
      code: "05 / TEXTILE & APPAREL",
      image: "/images/product_02.png",
      name: { zh: "服装纺织裁切刀", en: "Textile and Apparel Cutting Knives" },
      summary: {
        zh: "裁刀、圆刀、剪刀、电脑裁床及缝纫设备相关刀具与零件，可按设备品牌和旧刀样品匹配。",
        en: "Cutting knives, rotary knives, scissors and cutting-table parts matched to machine brand, drawings or old-blade samples."
      },
      equipment: { zh: "裁床、圆刀机、缝纫与裁剪设备", en: "Cutting tables, rotary cutters, sewing and cutting equipment" },
      focus: { zh: "锋利度、纤维毛边与重复安装", en: "Sharpness, fabric fraying and repeat fit" },
      rfq: {
        zh: ["设备品牌和型号", "布料或纤维类型", "旧刀尺寸、照片或样品", "安装方式、数量与使用频率"],
        en: ["Machine brand and model", "Fabric or fibre type", "Old-blade dimensions, photos or sample", "Mounting, quantity and operating frequency"]
      },
      applications: {
        zh: ["服装面料裁剪", "工业纺织品切割", "电脑裁床与缝纫设备备件"],
        en: ["Apparel fabric cutting", "Industrial textile cutting", "Cutting-table and sewing-machine spares"]
      }
    },
    {
      slug: "custom-industrial-blades",
      code: "06 / CUSTOM INDUSTRIAL",
      image: "/images/web/product-parts.jpg",
      name: { zh: "异型刀与设备配套刀", en: "Custom-shaped and Machine-matched Blades" },
      summary: {
        zh: "适用于停产旧件、样品复刻、设备厂配套、OEM/ODM 和长期备件订单，从安装接口与工况开始确认。",
        en: "For discontinued parts, sample matching, machine OEM supply, OEM/ODM and long-term spare-part orders, starting with fit and application review."
      },
      equipment: { zh: "非标设备、专机与 OEM 配套", en: "Special-purpose machines and OEM equipment" },
      focus: { zh: "样品复刻、安装匹配与批量一致", en: "Sample matching, fit and batch consistency" },
      rfq: {
        zh: ["图纸、样品或旧件照片", "安装位置和设备型号", "被切材料与失效现象", "试样数量和年度需求"],
        en: ["Drawing, sample or old-part photos", "Mounting position and machine model", "Material cut and failure pattern", "Prototype quantity and annual demand"]
      },
      applications: {
        zh: ["停产旧件替代", "设备厂 OEM 配套", "按样品和工况开发异型刀"],
        en: ["Discontinued-part replacement", "Machine OEM supply", "Application-led custom-shaped blades"]
      }
    }
  ],
  capabilities: [
    {
      slug: "heat-treatment",
      code: "01 / HEAT TREATMENT",
      image: "/images/web/laser-cutting.jpg",
      name: { zh: "热处理与结构成形", en: "Heat Treatment and Blade Shaping" },
      summary: {
        zh: "把材料、结构、热处理和后续研磨放在同一制造路线中评估，具体参数以图纸和应用确认结果为准。",
        en: "Material, geometry, heat treatment and downstream grinding are reviewed as one manufacturing route; final parameters follow drawing and application review."
      },
      evidence: {
        zh: ["公司资料列有多种热处理路线", "可衔接激光切割、机加工与研磨", "未确认材料前不预设硬度范围"],
        en: ["Company materials list multiple heat-treatment routes", "Connected to laser cutting, machining and grinding", "No hardness range is assumed before material review"]
      }
    },
    {
      slug: "precision-grinding",
      code: "02 / PRECISION GRINDING",
      image: "/images/web/product-parts.jpg",
      name: { zh: "精密加工与研磨", en: "Precision Machining and Grinding" },
      summary: {
        zh: "覆盖直刃、圆刀、锯片和异型件的加工与研磨路线，重点控制安装接口、刃口与批次重复性。",
        en: "Machining and grinding routes for straight knives, rotary knives, saw blades and custom parts, focused on fit, edge geometry and repeatability."
      },
      evidence: {
        zh: ["数控磨床、加工中心、车铣与内外圆磨", "支持样品验证和批量生产衔接", "具体公差和尺寸范围按图纸确认"],
        en: ["CNC grinding, machining centres, turning, milling and cylindrical grinding", "Supports prototype validation through batch production", "Tolerance and size range confirmed per drawing"]
      }
    },
    {
      slug: "inspection-lab",
      code: "03 / INSPECTION LAB",
      image: "/images/web/quality-control.jpg",
      name: { zh: "检测设备与批次记录", en: "Inspection Equipment and Batch Records" },
      summary: {
        zh: "通过材料、尺寸、硬度、金相和影像测量等检测环节，为样品验证和批量一致性提供证据。",
        en: "Material, dimensional, hardness, metallographic and image-measurement checks support prototype validation and batch consistency."
      },
      evidence: {
        zh: ["SPECTROLAB 光谱仪", "三丰三次元测定机", "KEYENCE 影像尺寸测量仪与 NIKON 金相显微镜"],
        en: ["SPECTROLAB spectrometer", "Mitutoyo coordinate measuring machine", "KEYENCE image measurement and NIKON metallographic microscope"]
      }
    }
  ]
};
