<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateAuthUserTable extends Migration
{
    public function up()
    {
        if ($this->db->tableExists('auth_user')) {
            return;
        }

        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],
            'first_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'last_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'password' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],
            'created_at' => [
                'type' => 'DATETIME',
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('email');
        $this->forge->createTable('auth_user');
    }

    public function down()
    {
        if ($this->db->tableExists('auth_user')) {
            $this->forge->dropTable('auth_user');
        }
    }
}
