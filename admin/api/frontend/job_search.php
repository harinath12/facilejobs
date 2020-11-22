<?php

function hm_job_search(){

	$res = get_results("select * from jobs order by id desc");

	$new = [];

	foreach ($res as $key => $value) {

		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');

		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');



		$arr = array('industry', 'career_level', 'qualification', 'job_level', 'keywords', 'location');



		foreach ($arr as $key => $val) {

			$value[$val] = get_relative_data('jobs', $val, $value['id']);

		}



		$value['title'] = stripslashes($value['title']);

		$value['description'] = strip_tags(stripslashes($value['description']));



		$new[] = $value;

	}



	$salary = get_row("SELECT max(salary) as maxsalary, min(salary) as minsalary FROM `jobs`");



	return array('status' => 'Success', 'data' => $new, 'salary' => $salary);

}



function hm_view_job(){

	$data = get_row("select * from jobs where id =". $_POST['id']);

	

	$arr = array('industry', 'career_level', 'qualification', 'job_level', 'keywords', 'location');



	foreach ($arr as $key => $val) {

		$data[$val] = get_relative_data('jobs', $val, $data['id']);

	}



	$data['title'] = stripslashes($data['title']);

	$data['description'] = stripslashes($data['description']);

    //$data['sdescription'] = strip_tags($data['description']);

    

	$data['category_detail'] = get_data_by_id('category', $data['category']);



	$data['company_name'] = get_meta('users', $data['posted_by'], 'company_name');

	$data['company_image'] = get_meta('users', $data['posted_by'], 'company_image');

	$data['company_slug_name'] = get_meta('users', $data['posted_by'], 'slug');



	$data['shortlisted'] = false;

	$data['applied'] = false;

	if(isset($_POST['user_id'])){

		$res = get_results("select * from job_applicants where job_id = ".$_POST['id']." and user_id = ".$_POST['user_id']);



		if(count($res)){

			$data['shortlisted'] = $res[0]['is_shortlisted'] == 1;

			$data['applied'] = $res[0]['is_applied'] == 1;

		}

	}



	$data['no_of_views'] = get_count("select * from views where type = 'job' and ref_id = ".$_POST['id']);



	$data['no_of_applicants'] = get_count("select * from job_applicants where job_id = ".$_POST['id']." and is_applied = 1");



	return array('status' => 'Success', 'data' => $data);

}



function hm_shortlist_job(){

	$res = get_results("select * from job_applicants where job_id = ".$_POST['job']." and user_id = ".$_POST['user']);

	

	if(count($res)){

		$arr = array(

			'is_shortlisted' => 1,

			'shortlisted_on' => date('Y-m-d H:i:s')

		);

		update('job_applicants', $arr, array('id' => $res[0]['id']));

	} else {

		$arr = array(

			'job_id' => $_POST['job'],

			'user_id' => $_POST['user'],

			'is_shortlisted' => 1,

			'shortlisted_on' => date('Y-m-d H:i:s')

		);

		insert('job_applicants', $arr);

	}

	return array('status' => 'Success');

}



function hm_apply_job(){



	if(isset($_POST['resume_list'])){

		set_meta('users', $_POST['user'], 'resume_list', $_POST['resume_list']);

	}

	$res = get_results("select * from job_applicants where job_id = ".$_POST['job']." and user_id = ".$_POST['user']);

	

	if(count($res)){

		$arr = array(

			'is_applied' => 1,

			'applied_on' => date('Y-m-d H:i:s')

		);

		update('job_applicants', $arr, array('id' => $res[0]['id']));

	} else {

		$arr = array(

			'job_id' => $_POST['job'],

			'user_id' => $_POST['user'],

			'is_applied' => 1,

			'applied_on' => date('Y-m-d H:i:s')

		);

		insert('job_applicants', $arr);

	}

	return array('status' => 'Success');

}



function hm_page_view(){

	if(isset($_POST['user'])){

		if($_POST['user'] != -1){

			$res = get_count("select * from views where type = 'job' and ref_id = ".$_POST['job']." and user_id = ".$_POST['user']);

			if($res == 0){

				$arr = array(

					'type' => 'job',

					'ref_id' => $_POST['job'],

					'user_id' => $_POST['user'],

					'view_on' => date('Y-m-d H:i:s')

				);

				insert('views', $arr);

			}

		} else {

			$arr = array(

				'type' => 'job',

				'ref_id' => $_POST['job'],

				'user_id' => $_POST['user'],

				'view_on' => date('Y-m-d H:i:s')

			);

			insert('views', $arr);

		}

	}	

	return array('status' => 'Success');

}



function hm_screening_data(){

	$res = get_results("select * from job_applicants where job_id = ".$_GET['job']);



	$response = array('job' => get_row("select * from jobs where id =". $_GET['job']));



	$response['status'] = array();



	$response['count'] = count($res);



	$status = array('Received resume', 'Screening', 'Interview', 'Offered', 'Hired', 'Disqualified', 'Candidate Rejected');



	foreach ($status as $key => $value) {

		$response['status'][$value] = [];

	}



	foreach ($res as $key => $value) {

		$st = $value['screening_status'] ? $value['screening_status'] : 'Received resume';



		$data = get_all_meta('users', $value['user_id']);

		$data['id'] = $value['id'];

		$data['user_id'] = $value['user_id'];



		$response['status'][$st][] = $data;

	}



	return array('status' => 'Success', 'data' => $response);

}



function hm_update_screening(){

	update('job_applicants', array('screening_status' => $_POST['status']), array('id' => $_POST['id']));

	return hm_screening_data();

}



function hm_getpage(){

	$response = get_row('select * from pages where slug = "'.$_GET['id'].'"');

	return array('status' => 'Success', 'data' => $response);

}

function hm_getblog(){

	$response = get_results('select * from blogs');

	return array('status' => 'Success', 'data' => $response);

}

function hm_getpartner(){

	$response = get_results('select * from partners');

	return array('status' => 'Success', 'data' => $response);

}