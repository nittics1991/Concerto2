<?php
return array(
    'dt_wf_period' => '+1 month',
    'column_list' => array(
        'no_cyu' => array(
            'header' => '注番',
            'row' => 1,
            'col' => 1,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'no_page' => array(
            'header' => 'No',
            'row' => 1,
            'col' => 3,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_page' => array(
            'header' => '名称',
            'row' => 1,
            'col' => 5,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'no_rev' => array(
            'header' => 'Rev',
            'row' => 1,
            'col' => 7,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'cd_bumon_sel' => array(
            'header' => '部門選択',
            'row' => 2,
            'col' => 1,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'select'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'cd_bumon' => array(
            'header' => '★部門',
            'row' => 2,
            'col' => 3,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'cd_tanto_sel' => array(
            'header' => '担当選択',
            'row' => 2,
            'col' => 5,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'select'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_tanto' => array(
            'header' => '★担当',
            'row' => 2,
            'col' => 7,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_setti' => array(
            'header' => '設置場所',
            'row' => 3,
            'col' => 1,
            'width' => 8,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'textarea',
                    'readonly' => true,
                    'style' => 'width:700px; height:18px;'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_syohin' => array(
            'header' => '品名',
            'row' => 4,
            'col' => 1,
            'width' => 8,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'textarea',
                    'readonly' => true,
                    'style' => 'width:700px; height:18px;'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_kisyu' => array(
            'header' => '予算機種',
            'row' => 5,
            'col' => 1,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_bunya_eigyo' => array(
            'header' => '分野',
            'row' => 5,
            'col' => 3,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_bunya_seizo_sel' => array(
            'header' => 'JOB種別選択',
            'row' => 5,
            'col' => 5,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'select'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_bunya_seizo' => array(
            'header' => 'JOB種別',
            'row' => 5,
            'col' => 7,
            'width' => 2,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'no_cyu_t' => array(
            'header' => '注番(T)',
            'row' => 6,
            'col' => 1,
            'width' => 2,
            'height' => 2,
            'element' => array(
                array(
                    'type' => 'text'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_puriage' => array(
            'header' => '売上予定',
            'row' => 6,
            'col' => 3,
            'width' => 2,
            'height' => 2,
            'element' => array(
                array(
                    'type' => 'text',
                    'readonly' => true
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'fg_fuyo' => array(
            'header' => '注番管理',
            'row' => 6,
            'col' => 5,
            'width' => 4,
            'height' => 2,
            'element' => array(
                array(
                    'type' => 'radio'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drq' => array(
            'header' => 'DR-Q',
            'row' => 8,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_kouki' => array(
            'header' => '工期',
            'row' => 8,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'date'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_dra' => array(
            'header' => 'DR-A',
            'row' => 9,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_zenkai' => array(
            'header' => '前回改造',
            'row' => 9,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'date'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_pmh' => array(
            'header' => 'PMH',
            'row' => 10,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_hatuban' => array(
            'header' => '発番',
            'row' => 10,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_koutei' => array(
            'header' => '工程表',
            'row' => 10,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_yokyu_hw' => array(
            'header' => '要求図HW',
            'row' => 11,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_yokyu_sw' => array(
            'header' => '要求図SW',
            'row' => 11,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_tov' => array(
            'header' => 'TOV確認',
            'row' => 11,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_cyunyu' => array(
            'header' => '注入計画',
            'row' => 12,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_cyotatu' => array(
            'header' => '調達項目',
            'row' => 12,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_hattyuu' => array(
            'header' => '発注書',
            'row' => 13,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),

        'dt_doc_irai_hw' => array(
            'header' => '承認依頼図HW',
            'row' => 13,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_irai_sw' => array(
            'header' => '承認依頼図SW',
            'row' => 13,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_tyousa' => array(
            'header' => '現地調査',
            'row' => 13,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_henkyaku_hw' => array(
            'header' => '承認返却図HW',
            'row' => 14,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_henkyaku_sw' => array(
            'header' => '承認返却図SW',
            'row' => 14,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_suiage' => array(
            'header' => '既設吸上',
            'row' => 14,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drb' => array(
            'header' => 'DR-B',
            'row' => 15,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_sikyuu' => array(
            'header' => '支給品受入',
            'row' => 16,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_sikyuu2' => array(
            'header' => '支給品支給',
            'row' => 16,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_tehai' => array(
            'header' => '手配',
            'row' => 16,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_seisaku_hw' => array(
            'header' => '製作図HW',
            'row' => 17,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_seisaku_sw' => array(
            'header' => '製作図SW',
            'row' => 17,
            'col' => 4,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drc' => array(
            'header' => 'DR-C',
            'row' => 18,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_drd' => array(
            'header' => 'DR-D',
            'row' => 19,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_seizous_hw' => array(
            'header' => '製造開始HW',
            'row' => 20,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_seizous_sw' => array(
            'header' => '製造開始SW',
            'row' => 20,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_ukeire' => array(
            'header' => '発注受入',
            'row' => 20,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_seizoue_hw' => array(
            'header' => '製造終了HW',
            'row' => 21,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_seizoue_sw' => array(
            'header' => '製造終了SW',
            'row' => 21,
            'col' => 4,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_dre' => array(
            'header' => 'DR-E',
            'row' => 22,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_doc_siken' => array(
            'header' => '試験図',
            'row' => 22,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drf1' => array(
            'header' => 'DR-F1',
            'row' => 23,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_sikens' => array(
            'header' => '試験開始',
            'row' => 24,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_sikene' => array(
            'header' => '試験終了',
            'row' => 24,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_hannyus' => array(
            'header' => '試験場搬入',
            'row' => 24,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drf' => array(
            'header' => 'DR-F2',
            'row' => 25,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_syatatis' => array(
            'header' => '社立開始',
            'row' => 26,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_syatatie' => array(
            'header' => '社立終了',
            'row' => 26,
            'col' => 4,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_kyakutatis' => array(
            'header' => '客立開始',
            'row' => 27,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_kyakutatie' => array(
            'header' => '客立終了',
            'row' => 27,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'kb_siteki_s' => array(
            'header' => '立会指摘数',
            'row' => 27,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_kouji' => array(
            'header' => '工事図',
            'row' => 28,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_gentyo' => array(
            'header' => '現調図',
            'row' => 28,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_yoryo' => array(
            'header' => '現調要領書',
            'row' => 28,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drg' => array(
            'header' => 'DR-G',
            'row' => 29,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_doc_siji' => array(
            'header' => '出張指示書',
            'row' => 30,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_virus' => array(
            'header' => 'VIRUSチェック',
            'row' => 30,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_soutatu' => array(
            'header' => '送達依頼',
            'row' => 30,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drsi' => array(
            'header' => '出荷承認',
            'row' => 31,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('syukka'),
            'auth' => true
        ),
        'dt_drst' => array(
            'header' => '出荷承認(T)',
            'row' => 31,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_syukka' => array(
            'header' => '出荷',
            'row' => 32,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_zanken_s' => array(
            'header' => '出荷残件処置',
            'row' => 32,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'kb_zanken_s' => array(
            'header' => '出荷残件数',
            'row' => 32,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_zanken_s' => array(
            'header' => '出荷残件コメント',
            'row' => 33,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'textarea',
                    'style' => 'width:800px; height:18px;'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_gentis' => array(
            'header' => '現調開始',
            'row' => 34,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_gentie' => array(
            'header' => '現調終了',
            'row' => 34,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_hannyug' => array(
            'header' => '現地搬入',
            'row' => 34,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_zanken_g' => array(
            'header' => '現調残件処置',
            'row' => 35,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array(),
            'auth' => false
        ),
        'kb_siteki_g' => array(
            'header' => '現調指摘数',
            'row' => 35,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'kb_zanken_g' => array(
            'header' => '現調残件数',
            'row' => 35,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_zanken_g' => array(
            'header' => '現調残件コメント',
            'row' => 36,
            'col' => 1,
            'width' => 9,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'textarea',
                    'style' => 'width:800px; height:18px;'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_doc_henkyaku' => array(
            'header' => '要領書返却',
            'row' => 37,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_service' => array(
            'header' => 'サービス引継',
            'row' => 37,
            'col' => 4,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'tm_wt' => array(
            'header' => 'WT時間',
            'row' => 37,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'number'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_drh' => array(
            'header' => 'DR-H',
            'row' => 38,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                ),
            ),
            'button' => array('gijiroku'),
            'auth' => true
        ),
        'dt_doc' => array(
            'header' => '完成図',
            'row' => 38,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_cpi' => array(
            'header' => 'DR完了',
            'row' => 39,
            'col' => 1,
            'width' => 6,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => true
        ),
        'dt_cpt' => array(
            'header' => 'DR完了(T)',
            'row' => 39,
            'col' => 7,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'dt_wf' => array(
            'header' => '★WF完了',
            'row' => 40,
            'col' => 1,
            'width' => 3,
            'height' => 1,
            'element' => array(
                array(
                    'type' => 'plan'
                )
            ),
            'button' => array(),
            'auth' => false
        ),
        'nm_biko' => array(
            'header' => '備考',
            'row' => 41,
            'col' => 1,
            'width' => 9,
            'height' => 30,
            'element' => array(
                array(
                    'type' => 'textarea',
                    'style' => 'width:800px; height:610px;'
                )
            ),
            'button' => array(),
            'auth' => false
        )
    )
);
