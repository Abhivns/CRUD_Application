<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', static function ($routes) {
    $routes->post('register', 'AuthController::register');
    $routes->post('login', 'AuthController::login');

    $routes->group('', ['filter' => 'auth'], static function ($routes) {
        $routes->get('profile', 'AuthController::profile');
        $routes->get('teachers', 'TeacherController::index');
        $routes->get('teachers/(:num)', 'TeacherController::show/$1');
        $routes->post('teachers', 'TeacherController::create');
        $routes->put('teachers/(:num)', 'TeacherController::update/$1');
        $routes->delete('teachers/(:num)', 'TeacherController::delete/$1');
    });
});
