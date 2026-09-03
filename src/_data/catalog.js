module.exports = {
  products: [
    {
      slug: "woodworking-knives",
      code: "01 / WOODWORKING",
      image: null,
      name: { zh: "木工与家具制造刀具", en: "Woodworking and Furniture Machine Knives" },
      summary: {
        zh: "用于平刨、压刨、指接及家具生产设备的平刨刀、指接刀、电刨刀和配套刀片。产品结构依据图纸、实物样品或设备型号进行技术评估。",
        en: "Planer, finger-joint and equipment-specific knives for woodworking and furniture production. Blade geometry is reviewed from drawings, physical samples or machine information."
      },
      equipment: { zh: "平刨、压刨、指接与家具生产线", en: "Planers, moulders, finger-joint and furniture lines" },
      materials: { zh: "实木、板材及木制零部件", en: "Solid wood, boards and wood components" },
      focus: { zh: "刃口几何、平面度、耐磨性与更换一致性", en: "Edge geometry, flatness, wear resistance and replacement consistency" },
      reviewInputs: [
        {
          label: { zh: "设备与安装", en: "Machine and mounting" },
          detail: { zh: "设备品牌型号、刀轴或安装接口、现用刀具尺寸", en: "Machine make and model, cutterhead or mounting interface, and current blade dimensions" }
        },
        {
          label: { zh: "被加工材料", en: "Processed material" },
          detail: { zh: "木材种类、板材类型、进料方式及使用频率", en: "Wood species, board type, feed method and operating frequency" }
        },
        {
          label: { zh: "当前问题", en: "Current issue" },
          detail: { zh: "表面质量、刃口磨损或崩刃、替换安装匹配情况", en: "Surface quality, edge wear or chipping, and replacement-fit conditions" }
        },
        {
          label: { zh: "项目需求", en: "Project demand" },
          detail: { zh: "试样数量、后续需求量及现场验证标准", en: "Prototype quantity, recurring demand and on-machine validation criteria" }
        }
      ],
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
      image: null,
      name: { zh: "食品机械用刀", en: "Food Processing Machine Knives" },
      summary: {
        zh: "用于肉类切片、绞碎、分切及食品加工设备的机械刀具。材料、刃口与安装接口依据食品类型、清洁方式和设备要求进行评估。",
        en: "Machine knives for meat slicing, mincing, portioning and food-processing equipment. Material, edge geometry and mounting interfaces are reviewed against the product, cleaning method and machine requirements."
      },
      equipment: { zh: "切片、绞肉、分切与包装前处理设备", en: "Slicing, mincing, portioning and pre-packaging equipment" },
      materials: { zh: "肉类及其他食品物料", en: "Meat and other food products" },
      focus: { zh: "材料适用性、清洁要求、耐腐蚀性与刃口稳定性", en: "Material suitability, cleanability, corrosion resistance and edge stability" },
      reviewInputs: [
        {
          label: { zh: "设备与安装", en: "Machine and mounting" },
          detail: { zh: "设备品牌型号、安装方式及现用刀具尺寸", en: "Machine make and model, mounting method and current blade dimensions" }
        },
        {
          label: { zh: "食品与切割", en: "Product and cut" },
          detail: { zh: "食品类型、产品状态、切割方式及使用频率", en: "Food type, product condition, cutting method and operating frequency" }
        },
        {
          label: { zh: "清洁与现状", en: "Cleaning and condition" },
          detail: { zh: "清洁方式、使用环境、刃口状态及当前问题", en: "Cleaning method, operating environment, edge condition and current issue" }
        },
        {
          label: { zh: "项目需求", en: "Project demand" },
          detail: { zh: "试样数量、后续需求量及切割验收要求", en: "Prototype quantity, recurring demand and cut-acceptance requirements" }
        }
      ],
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
      image: null,
      name: { zh: "塑料粉碎与造粒刀具", en: "Plastic Crusher and Granulator Knives" },
      summary: {
        zh: "用于粉碎机、破碎机、造粒机及塑料回收设备。材料与制造工艺依据被处理材料、设备参数、负载及磨损情况进行评估。",
        en: "Knives for crushers, granulators and plastics-recycling equipment. Material and manufacturing processes are reviewed against the processed material, machine parameters, load and wear conditions."
      },
      equipment: { zh: "粉碎机、破碎机、造粒机与回收线", en: "Crushers, granulators and recycling lines" },
      materials: { zh: "塑料制品、回收料及含填充物料", en: "Plastic products, recyclate and filled materials" },
      focus: { zh: "抗冲击性、耐磨性、崩刃风险与批次一致性", en: "Impact resistance, wear resistance, chipping risk and batch consistency" },
      reviewInputs: [
        {
          label: { zh: "设备与装刀", en: "Machine and knife setup" },
          detail: { zh: "设备型号、动刀与定刀配置、装刀方式及已知转速", en: "Machine model, rotor and stator knife arrangement, mounting method and speed if known" }
        },
        {
          label: { zh: "被处理材料", en: "Processed material" },
          detail: { zh: "塑料类型、回收料状态、填充物及杂质情况", en: "Plastic type, recyclate condition, fillers and contamination conditions" }
        },
        {
          label: { zh: "磨损与失效", en: "Wear and failure" },
          detail: { zh: "磨损位置、崩刃或变形情况、现用刀具照片", en: "Wear location, chipping or deformation, and photographs of the current knives" }
        },
        {
          label: { zh: "项目需求", en: "Project demand" },
          detail: { zh: "试样数量、年度需求及现场验证目标", en: "Prototype quantity, annual demand and on-machine validation target" }
        }
      ],
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
      guideSlug: "paper-slitter-knife-selection",
      code: "04 / PAPER CONVERTING",
      image: null,
      name: { zh: "纸品分切与裁切刀具", en: "Paper Slitting and Cutting Knives" },
      summary: {
        zh: "用于纸张、纸板和卷材的分条、修边与裁切。外径、内孔、厚度、端面及刃口要求依据图纸和设备条件确认。",
        en: "Knives for slitting, edge trimming and cutting paper, board and web materials. Outside diameter, bore, thickness, face condition and edge requirements are confirmed from drawings and machine conditions."
      },
      equipment: { zh: "分条机、裁纸机与修边设备", en: "Slitters, paper cutters and trimming equipment" },
      materials: { zh: "纸张、纸板及卷材", en: "Paper, board and web materials" },
      focus: { zh: "切口质量、同心度、厚度与端面质量", en: "Cut quality, concentricity, thickness and face condition" },
      reviewInputs: [
        {
          label: { zh: "设备与配刀", en: "Machine and knife arrangement" },
          detail: { zh: "设备型号、分切方式、上下刀或配刀结构", en: "Machine model, slitting method and upper-lower knife arrangement" }
        },
        {
          label: { zh: "纸材与工况", en: "Material and operation" },
          detail: { zh: "纸材类型、克重、层数、运行方式及使用频率", en: "Paper grade, basis weight, layer count, operating method and frequency" }
        },
        {
          label: { zh: "刀具接口", en: "Knife interface" },
          detail: { zh: "外径、内孔、厚度、孔位及现用刀具照片", en: "Outside diameter, bore, thickness, hole pattern and current-knife photographs" }
        },
        {
          label: { zh: "质量与需求", en: "Quality and demand" },
          detail: { zh: "切口、粉尘或毛刺情况、需求数量及验收要求", en: "Cut edge, dust or burr conditions, required quantity and acceptance requirements" }
        }
      ],
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
      guideSlug: "textile-cutting-knife-selection",
      code: "05 / TEXTILE & APPAREL",
      image: null,
      name: { zh: "纺织与服装裁切刀具", en: "Textile and Apparel Cutting Knives" },
      summary: {
        zh: "用于纺织面料、工业织物及服装生产设备的裁刀、圆刀、剪刀和相关零件。刀具规格依据设备品牌型号、图纸或实物样品确认。",
        en: "Cutting knives, rotary knives, scissors and related parts for textile, technical-fabric and apparel equipment. Specifications are confirmed from machine information, drawings or physical samples."
      },
      equipment: { zh: "裁床、圆刀机、缝纫与裁剪设备", en: "Cutting tables, rotary cutters, sewing and cutting equipment" },
      materials: { zh: "服装面料、纤维材料及工业织物", en: "Apparel fabrics, fibre materials and technical textiles" },
      focus: { zh: "刃口锋利度、纤维毛边控制与重复安装一致性", en: "Edge sharpness, fraying control and repeatable fit" },
      reviewInputs: [
        {
          label: { zh: "设备与安装", en: "Machine and mounting" },
          detail: { zh: "设备品牌型号、刀具形式、安装方式及现用尺寸", en: "Machine make and model, knife form, mounting method and current dimensions" }
        },
        {
          label: { zh: "面料与铺层", en: "Fabric and layup" },
          detail: { zh: "面料或纤维类型、铺层情况、切割方式及使用频率", en: "Fabric or fibre type, layup conditions, cutting method and operating frequency" }
        },
        {
          label: { zh: "当前问题", en: "Current issue" },
          detail: { zh: "切边质量、毛边、运行阻力及重复安装情况", en: "Cut-edge quality, fraying, cutting resistance and repeatable-fit conditions" }
        },
        {
          label: { zh: "项目需求", en: "Project demand" },
          detail: { zh: "试样数量、后续需求量及现场验证要求", en: "Prototype quantity, recurring demand and on-machine validation requirements" }
        }
      ],
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
      guideSlug: "custom-machine-knife-from-drawing-or-sample",
      code: "06 / CUSTOM INDUSTRIAL",
      image: null,
      name: { zh: "异型与设备配套刀具", en: "Custom and Machine-specific Blades" },
      summary: {
        zh: "面向停产零件替代、实物样品复刻、设备制造商配套及长期备件需求。安装接口、刀具几何与制造工艺依据技术资料和工况确认。",
        en: "For discontinued-part replacement, physical-sample replication, equipment-manufacturer supply and long-term spare requirements. Mounting interfaces, blade geometry and manufacturing processes are confirmed from technical information and operating conditions."
      },
      equipment: { zh: "非标设备、专用设备与制造商配套", en: "Non-standard, special-purpose and OEM equipment" },
      materials: { zh: "由设备用途决定的金属或非金属被切材料", en: "Metallic or non-metallic materials defined by the application" },
      focus: { zh: "样品复刻、安装匹配与批次一致性", en: "Sample replication, fit and batch consistency" },
      reviewInputs: [
        {
          label: { zh: "零件与接口", en: "Part and interface" },
          detail: { zh: "零件功能、安装位置、设备型号及配合接口", en: "Part function, mounting position, machine model and mating interface" }
        },
        {
          label: { zh: "现有资料", en: "Available evidence" },
          detail: { zh: "图纸版本、实物样品、旧件尺寸及多角度照片", en: "Drawing revision, physical sample, old-part dimensions and multi-angle photographs" }
        },
        {
          label: { zh: "工况与问题", en: "Application and issue" },
          detail: { zh: "被切材料、运行方式、失效情况及改进目标", en: "Material cut, operating method, failure condition and improvement target" }
        },
        {
          label: { zh: "项目需求", en: "Project demand" },
          detail: { zh: "试样数量、年度需求及装机验证要求", en: "Prototype quantity, annual demand and installation-validation requirements" }
        }
      ],
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
      image: null,
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
        zh: ["材料成分可通过光谱仪或手持式 X 射线荧光光谱仪进行相应确认", "维氏硬度、洛氏硬度与金相检验依据材料及热处理控制要求选择", "三坐标、影像尺寸测量与投影测量用于相应尺寸和几何特征", "表面粗糙度与膜厚按图纸、工艺或验收要求检测"],
        en: ["Material composition can be reviewed with spectrometry or handheld XRF analysis where applicable", "Vickers hardness, Rockwell hardness and metallographic inspection are selected according to material and heat-treatment controls", "Coordinate, image and profile-projection measurement support applicable dimensional and geometric characteristics", "Surface roughness and coating thickness are checked where required by drawings, process routes or acceptance criteria"]
      }
    }
  ]
};
