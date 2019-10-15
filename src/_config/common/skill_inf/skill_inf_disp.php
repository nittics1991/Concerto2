<?php
return array(
    'dt_yukou_alarm' => '+1 month'
    , 'column_list' => array(
        //順番固定
        '' => array(
            'no_keiken' => '経験年数',
            'no_level_r' => '現在レベル',
            'no_level_t' => '目標レベル',
            'dt_target_t' => '目標(有効)年月日',
            'dt_target_r' => '達成(受講)年月日',
            'no_point_s' => 'ポイント合計',
            'no_point_p' => 'ポイント計画',
            'no_point_r' => 'ポイント実績',
            'nm_biko' => '備考'
        ),
        '1000000000' => array(
            'no_keiken' => '経験年数',
            'no_level_r' => '現在レベル',
            'no_level_t' => '目標レベル',
            'dt_target_t' => '目標年月日',
            'dt_target_r' => '達成年月日'
        ),
        '2000000000' => array(
            'no_point_s' => 'ポイント合計',
            'no_point_p' => 'ポイント計画',
            'no_point_r' => 'ポイント実績'
        ),
        '3000000000' => array(
            'dt_target_r' => '取得年月日',
            'dt_target_t' => '目標年月日'
        ),
        '4000000000' => array(
            'no_level_r' => '現在レベル',
            'no_level_t' => '目標レベル',
            'dt_target_t' => '目標年月日',
            'dt_target_r' => '達成年月日',
            'no_point_s' => 'ポイント合計',
            'no_point_p' => 'ポイント計画',
            'no_point_r' => 'ポイント実績',
            'nm_biko' => '備考'
        ),
        '5000000000' => array(
            'dt_target_r' => '受講年月日',
            'dt_target_t' => '有効年月日'
        )
    )   //END column_list
    , 'valid_list' => array(
            'no_keiken' => 'validKeiken',
            'no_level_r' => 'validLevel',
            'no_level_t' => 'validLevel',
            'dt_target_t' => 'validYYYYMMDD',
            'dt_target_r' => 'validYYYYMMDD',
            'no_point_s' => 'validPointSum',
            'no_point_p' => 'validPoint',
            'no_point_r' => 'validPoint',
            'nm_biko' => 'validText'
    )   //END valid_list
);
