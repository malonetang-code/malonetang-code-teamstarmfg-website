module.exports = {
  products: [
    {
      slug: "woodworking-knives",
      code: "01 / WOODWORKING",
      image: "/images/product_01.png",
      name: { zh: "木工与家具制造刀具", en: "Woodworking and Furniture Machine Knives" },
      summary: {
        zh: "用于平刨、压刨、指接及家具生产设备的平刨刀、指接刀、电刨刀和配套刀片。产品结构依据图纸、实物样品或设备型号进行技术评估。",
        en: "Planer, finger-joint and equipment-specific knives for woodworking and furniture production. Blade geometry is reviewed from drawings, physical samples or machine information."
      },
      equipment: { zh: "平刨、压刨、指接与家具生产线", en: "Planers, moulders, finger-joint and furniture lines" },
      focus: { zh: "刃口几何、平面度、耐磨性与更换一致性", en: "Edge geometry, flatness, wear resistance and replacement consistency" },
      rfq: {
        zh: ["刀具尺寸、厚度及孔位", "设备品牌型号或旧刀照片", "被加工木材及使用频率", "需求数量及预期使用寿命"],
        en: ["Blade dimensions, thickness and hole pattern", "Machine make and model or old-blade photos", "Wood species and operating frequency", "Required quantity and target service life"]
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
        zh: "用于肉类切片、绞碎、分切及食品加工设备的机械刀具。材料、刃口与安装接口依据食品类型、清洁方式和设备要求进行评估。",
        en: "Machine knives for meat slicing, mincing, portioning and food-processing equipment. Material, edge geometry and mounting interfaces are reviewed against the product, cleaning method and machine requirements."
      },
      equipment: { zh: "切片、绞肉、分切与包装前处理设备", en: "Slicing, mincing, portioning and pre-packaging equipment" },
      focus: { zh: "材料适用性、清洁要求、耐腐蚀性与刃口稳定性", en: "Material suitability, cleanability, corrosion resistance and edge stability" },
      rfq: {
        zh: ["食品类型及切割方式", "设备品牌及型号", "刀具尺寸或实物样品照片", "清洁方式、需求数量及预期使用寿命"],
        en: ["Food product and cutting method", "Machine make and model", "Blade dimensions or physical-sample photos", "Cleaning method, required quantity and target service life"]
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
      name: { zh: "塑料粉碎与造粒刀具", en: "Plastic Crusher and Granulator Knives" },
      summary: {
        zh: "用于粉碎机、破碎机、造粒机及塑料回收设备。材料与制造工艺依据被处理材料、设备参数、负载及磨损情况进行评估。",
        en: "Knives for crushers, granulators and plastics-recycling equipment. Material and manufacturing processes are reviewed against the processed material, machine parameters, load and wear conditions."
      },
      equipment: { zh: "粉碎机、破碎机、造粒机与回收线", en: "Crushers, granulators and recycling lines" },
      focus: { zh: "抗冲击性、耐磨性、崩刃风险与批次一致性", en: "Impact resistance, wear resistance, chipping risk and batch consistency" },
      rfq: {
        zh: ["塑料类型及杂质情况", "设备型号、转速及装刀方式", "图纸、旧刀照片或实物样品", "磨损情况、需求数量及预期使用寿命"],
        en: ["Plastic type and contamination conditions", "Machine model, speed and mounting method", "Drawing, old-blade photos or physical sample", "Wear conditions, required quantity and target service life"]
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
      name: { zh: "纸品分切与裁切刀具", en: "Paper Slitting and Cutting Knives" },
      summary: {
        zh: "用于纸张、纸板和卷材的分条、修边与裁切。外径、内孔、厚度、端面及刃口要求依据图纸和设备条件确认。",
        en: "Knives for slitting, edge trimming and cutting paper, board and web materials. Outside diameter, bore, thickness, face condition and edge requirements are confirmed from drawings and machine conditions."
      },
      equipment: { zh: "分条机、裁纸机与修边设备", en: "Slitters, paper cutters and trimming equipment" },
      focus: { zh: "切口质量、同心度、厚度与端面质量", en: "Cut quality, concentricity, thickness and face condition" },
      rfq: {
        zh: ["外径、内孔、厚度及孔位", "纸材、克重及切割层数", "配刀方式及设备型号", "需求数量及切口质量要求"],
        en: ["Outside diameter, bore, thickness and hole pattern", "Paper grade, basis weight and layer count", "Knife arrangement and machine model", "Required quantity and cut-quality requirements"]
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
      name: { zh: "纺织与服装裁切刀具", en: "Textile and Apparel Cutting Knives" },
      summary: {
        zh: "用于纺织面料、工业织物及服装生产设备的裁刀、圆刀、剪刀和相关零件。刀具规格依据设备品牌型号、图纸或实物样品确认。",
        en: "Cutting knives, rotary knives, scissors and related parts for textile, technical-fabric and apparel equipment. Specifications are confirmed from machine information, drawings or physical samples."
      },
      equipment: { zh: "裁床、圆刀机、缝纫与裁剪设备", en: "Cutting tables, rotary cutters, sewing and cutting equipment" },
      focus: { zh: "刃口锋利度、纤维毛边控制与重复安装一致性", en: "Edge sharpness, fraying control and repeatable fit" },
      rfq: {
        zh: ["设备品牌及型号", "面料或纤维类型", "旧刀尺寸、照片或实物样品", "安装方式、需求数量及使用频率"],
        en: ["Machine make and model", "Fabric or fibre type", "Old-blade dimensions, photos or physical sample", "Mounting method, required quantity and operating frequency"]
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
      name: { zh: "异型与设备配套刀具", en: "Custom and Machine-specific Blades" },
      summary: {
        zh: "面向停产零件替代、实物样品复刻、设备制造商配套及长期备件需求。安装接口、刀具几何与制造工艺依据技术资料和工况确认。",
        en: "For discontinued-part replacement, physical-sample replication, equipment-manufacturer supply and long-term spare requirements. Mounting interfaces, blade geometry and manufacturing processes are confirmed from technical information and operating conditions."
      },
      equipment: { zh: "非标设备、专用设备与制造商配套", en: "Non-standard, special-purpose and OEM equipment" },
      focus: { zh: "样品复刻、安装匹配与批次一致性", en: "Sample replication, fit and batch consistency" },
      rfq: {
        zh: ["图纸、实物样品或旧件照片", "安装位置及设备型号", "被切材料及失效情况", "试样数量及年度需求"],
        en: ["Drawing, physical sample or old-part photos", "Mounting position and machine model", "Material cut and failure conditions", "Prototype quantity and annual demand"]
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
      name: { zh: "刀坯成形与热处理", en: "Blade Shaping and Heat Treatment" },
      summary: {
        zh: "依据材料、刀具结构及应用要求，评估刀坯成形、热处理与后续研磨的工艺衔接。具体参数以图纸和技术评估结果为准。",
        en: "Blade shaping, heat treatment and downstream grinding are planned together according to material, geometry and application requirements. Final parameters follow drawing and technical review."
      },
      evidence: {
        zh: ["根据材料、刀具结构及应用要求评估热处理工艺", "刀坯成形可衔接激光切割、机加工与研磨工序", "材料牌号与硬度要求经技术评估后确认"],
        en: ["Heat-treatment processes reviewed against material, blade geometry and application", "Blade shaping integrated with laser cutting, machining and grinding", "Material grade and hardness requirements confirmed after technical review"]
      }
    },
    {
      slug: "precision-grinding",
      code: "02 / PRECISION GRINDING",
      image: "/images/web/product-parts.jpg",
      name: { zh: "精密加工与研磨", en: "Precision Machining and Grinding" },
      summary: {
        zh: "适用于直刃刀、圆刀、锯片及异型件的机加工与研磨工艺，重点控制安装接口、刀具几何和批次重复性。",
        en: "Machining and grinding processes for straight knives, rotary knives, saw blades and custom parts, with control focused on mounting interfaces, blade geometry and batch repeatability."
      },
      evidence: {
        zh: ["数控磨削、加工中心、车削、铣削及内外圆磨设备", "支持样品试制与批量制造", "公差与加工范围以图纸技术评估为准"],
        en: ["CNC grinding, machining centres, turning, milling and cylindrical grinding equipment", "Supports prototype manufacture and series production", "Tolerances and working range confirmed through drawing review"]
      }
    },
    {
      slug: "inspection-lab",
      code: "03 / INSPECTION LAB",
      image: "/images/web/quality-control.jpg",
      name: { zh: "检测设备与批次记录", en: "Inspection Equipment and Batch Records" },
      summary: {
        zh: "材料成分、尺寸、硬度、金相及影像测量等检验项目，为样品验证、成品检验和批次一致性提供依据。",
        en: "Material-composition, dimensional, hardness, metallographic and image-measurement inspections support prototype validation, final inspection and batch consistency."
      },
      evidence: {
        zh: ["SPECTROLAB 光谱仪用于材料成分分析", "三丰三坐标测量机用于尺寸与几何检测", "KEYENCE 影像尺寸测量仪与 NIKON 金相显微镜用于相应检验项目"],
        en: ["SPECTROLAB spectrometer for material-composition analysis", "Mitutoyo coordinate measuring machine for dimensional and geometric inspection", "KEYENCE image-measurement system and NIKON metallographic microscope for applicable inspection items"]
      }
    }
  ]
};
