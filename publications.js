// Update publication metadata here. Preserve published / preprint distinctions.
// Sources: the owner's CV, Google Scholar, and the linked paper / code pages.
// Venue classifications use CCF 2026 (7th edition) and CAS 2025 major categories.
// Prefer CCF A/B; other journals fall back to a verified CAS zone.
// AI Open has no verified CAS 2025 classification here; arXiv is not a journal.
// Sources and update instructions are recorded in README.md.
window.VENUE_RANKINGS = {
  SIGIR: {ccf: "A", ccfYear: 2026},
  KDD: {ccf: "A", ccfYear: 2026},
  WWW: {ccf: "A", ccfYear: 2026},
  TKDE: {ccf: "A", ccfYear: 2026},
  TOIS: {ccf: "A", ccfYear: 2026},
  TBD: {ccf: "C", ccfYear: 2026, casZone: 2, casYear: 2025},
  TST: {casZone: 2, casYear: 2025},
  TCE: {casZone: 2, casYear: 2025},
  ASC: {casZone: 2, casYear: 2025}
};

window.PUBLICATIONS = [
  {id:"hanorec",year:2026,venue:"SIGIR",status:"published",first:true,title:"Multimodal Large Language Models with Adaptive Preference Optimization for Sequential Recommendation",authors:"Yu Wang, Yonghui Yang, Le Wu, Yi Zhang, Fei Liu, Richang Hong",publication:"The 49th International ACM SIGIR Conference on Research and Development in Information Retrieval",paper:"https://arxiv.org/abs/2511.18740",code:"https://github.com/wangyu0627/HaNoRec",scholar:"mB3voiENLucC"},
  {id:"mllmrec",year:2026,venue:"arXiv",status:"preprint",first:true,title:"MLLMRec-R1: Incentivizing Reasoning Capability in Large Language Models for Multimodal Sequential Recommendation",authors:"Yu Wang, Yonghui Yang, Le Wu, Jiancan Wu, Hefei Xu, Hui Lin",publication:"arXiv:2603.06243 · Preprint",paper:"https://arxiv.org/abs/2603.06243",code:"https://github.com/wangyu0627/MLLMRec-R1",scholar:"mVmsd5A6BfQC"},
  {id:"proex",year:2026,venue:"KDD",status:"published",first:false,title:"ProEx: A Unified Framework Leveraging Large Language Model with Profile Extrapolation for Recommendation",authors:"Yi Zhang, Yiwen Zhang, Yu Wang, Tong Chen, Hongzhi Yin",publication:"The 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining",paper:"https://arxiv.org/abs/2512.00679",code:"https://github.com/BlueGhostYi/ProRec",scholar:"M3ejUd6NZC8C"},
  {id:"vcsoup",year:2026,venue:"WWW",status:"published",first:false,title:"VC-Soup: Value-Consistency Guided Multi-Value Alignment for Large Language Models",authors:"Hefei Xu, Le Wu, Yu Wang, Min Hou, Han Wu, Zhen Zhang, Meng Wang",publication:"Proceedings of the ACM Web Conference",scholar:"QIV2ME_5wuYC"},
  {id:"survey",year:2026,venue:"AI Open",status:"published",first:false,title:"A Survey on Generative Recommendation: Data, Model, and Tasks",authors:"Min Hou, Le Wu, Yuxin Liao, Yonghui Yang, Zhen Zhang, Yu Wang, Changlong Zheng, Han Wu, Richang Hong",publication:"AI Open",scholar:"Zph67rFs4hoC"},
  {id:"memory",year:2026,venue:"arXiv",status:"preprint",first:false,title:"From Atom to Community: Structured and Evolving Agent Memory for User Behavior Modeling",authors:"Y Liao, L Wu, M Hou, Y Wang, H Wu, M Wang",publication:"arXiv:2601.16872 · Preprint",paper:"https://arxiv.org/abs/2601.16872",scholar:"aqlVkmm33-oC"},
  {id:"federated",year:2026,venue:"TST",status:"published",first:false,second:true,selfAuthorIndex:1,title:"Federated Heterogeneous Graph Contrastive Learning for Privacy-preserving Recommendation",authors:"Y Wang, Y Wang, Y Zhang",publication:"Tsinghua Science and Technology",scholar:"qxL8FJ1GzNcC"},
  {id:"irllrec",year:2025,venue:"SIGIR",status:"published",first:true,title:"Intent Representation Learning with Large Language Model for Recommendation",authors:"Yu Wang, Lei Sang, Yi Zhang, Yiwen Zhang",publication:"The 48th International ACM SIGIR Conference on Research and Development in Information Retrieval",paper:"https://arxiv.org/abs/2502.03307",code:"https://github.com/wangyu0627/IRLLRec",scholar:"LkGwnXOMwfcC"},
  {id:"gchgnn",year:2025,venue:"TBD",status:"published",first:true,title:"Generative-Contrastive Heterogeneous Graph Neural Network",authors:"Yu Wang, Lei Sang, Yi Zhang, Yiwen Zhang, Xindong Wu",publication:"IEEE Transactions on Big Data",paper:"https://arxiv.org/abs/2404.02810",code:"https://github.com/wangyu0627/GC-HGNN",scholar:"Se3iqnhoufwC"},
  {id:"ihgcl",advisorFirst:true,second:true,year:2025,venue:"TKDE",status:"published",first:false,title:"Intent-guided Heterogeneous Graph Contrastive Learning for Recommendation",authors:"Lei Sang, Yu Wang, Yi Zhang, Yiwen Zhang, Xindong Wu",publication:"IEEE Transactions on Knowledge and Data Engineering",paper:"https://arxiv.org/abs/2407.17234",code:"https://github.com/wangyu0627/IHGCL",scholar:"YsMSGLbcyi4C"},
  {id:"pretraining",advisorFirst:true,second:true,year:2025,venue:"TOIS",status:"published",first:false,title:"Denoising Heterogeneous Graph Pre-training Framework for Recommendation",authors:"Lei Sang, Yu Wang, Yiwen Zhang, Xindong Wu",publication:"ACM Transactions on Information Systems",paper:"https://dl.acm.org/doi/pdf/10.1145/3706632",code:"https://github.com/wangyu0627/DHGPF",scholar:"5nxA0vEk-isC"},
  {id:"dmrec",year:2025,venue:"SIGIR",status:"published",first:false,title:"Towards Distribution Matching between Collaborative and Language Spaces for Generative Recommendation",authors:"Yi Zhang, Yiwen Zhang, Yu Wang, Tong Chen, Hongzhi Yin",publication:"The 48th International ACM SIGIR Conference on Research and Development in Information Retrieval",paper:"https://arxiv.org/abs/2504.07363",code:"https://github.com/BlueGhostYi/DMRec",scholar:"_FxGoFyzp5QC"},
  {id:"bottleneck",advisorFirst:true,year:2025,venue:"TOIS",status:"published",first:false,title:"Bottlenecked Heterogeneous Graph Contrastive Learning for Robust Recommendation",authors:"Lei Sang, Maohao Huang, Yu Wang, Yiwen Zhang, Xindong Wu",publication:"ACM Transactions on Information Systems",scholar:"3fE2CSJIrl8C"},
  {id:"simple",advisorFirst:true,year:2025,venue:"TCE",status:"published",first:false,title:"Simple Yet Effective Heterogeneous Graph Contrastive Learning for Recommendation",authors:"L Sang, H Zhang, Y Wang, Y Zhang",publication:"IEEE Transactions on Consumer Electronics",scholar:"UebtZRa9Y70C"},
  {id:"masked",advisorFirst:true,year:2025,venue:"ASC",status:"published",first:false,title:"Masked Heterogeneous Graph Attention Network for Robust Recommendation",authors:"L Sang, X Li, Y Wang, Y Zhang, S Lian, Y Zhang",publication:"Applied Soft Computing",scholar:"8k81kl-MbHgC"}
];

