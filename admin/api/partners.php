<?php

/* Admin Side*/

function hm_partners(){

	$res = get_results("select * from partners");

	return array('status' => 'Success', 'data' => $res);

}



function hm_save_partners(){

	$data = $_POST;

	

	



	if(isset($data['id'])){

		$id = $data['id'];

		unset($data['id']);

		update('partners', $data, array('id' => $id));

		return array('status' => 'Success', 'msg' => 'Partner Updated Successfully');

	} else {


		$data['status']= 1;

		insert('partners', $data);

		return array('status' => 'Success', 'msg' => 'Partner Added Successfully');

	}

}



function hm_delete_partners(){

	$data = $_POST['delete'];



	foreach ($data as $key => $value) {

		delete('partners', array('id' => $value));

	}



	return array('status' => 'Success', 'msg' => 'Partner Deleted Successfully');

}



function hm_change_partners_status(){

	update('partners', array('status' => $_POST['status']), array('id' => $_POST['id']));



	if($_POST['status']){

		return array('status' => 'Success', 'msg' => 'Partner Published Successfully');

	} else {

		return array('status' => 'Success', 'msg' => 'Partner Unpublished Successfully');

	}

}