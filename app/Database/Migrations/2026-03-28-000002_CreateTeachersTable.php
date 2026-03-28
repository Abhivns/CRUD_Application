<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTeachersTable extends Migration
{
    public function up()
    {
        if ($this->db->tableExists('teachers')) {
            return;
        }

        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
            ],
            'university_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],
            'gender' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
            ],
            'year_joined' => [
                'type'       => 'INT',
                'constraint' => 4,
            ],
            'department' => [
                'type'       => 'VARCHAR',
                'constraint' => 150,
                'null'       => true,
            ],
            'phone_number' => [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'null'       => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('user_id');
        $this->forge->addForeignKey('user_id', 'auth_user', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('teachers');
    }

    public function down()
    {
        if ($this->db->tableExists('teachers')) {
            $this->forge->dropTable('teachers');
        }
    }
}
